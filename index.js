'use strict';

const Discord = require('discord.js');
// const debug = require('debug')('bot:client');
let Bot = new Discord.Client({
  autoReconnect: true
});

const chalk = require('chalk');
const { error, debug } = require('./log');
const unit = ['', 'K', 'M', 'G', 'T', 'P'];
let ready = false;

const commandMessages = {};
const Stats = {
  Messages: {
    Received: 0,
    Sent: 0
  }
};

Bot.on('message', msg => {
  if (msg.author == Bot.user) return Stats.Messages.Sent++;
  Stats.Messages.Received++;

  let content = msg.content.toLowerCase()
  if (!content.startsWith('oh please')) return false;

  console.log(chalk.bold.cyan('\n============= M E S S A G E ============'));
  console.log(chalk.green(`[Server]       : ${msg.server ? msg.server.name : `${msg.author.username}'s DM`}`));
  console.log(chalk.magenta(`[Channel]      : ${msg.channel.name ? msg.channel.name : `${msg.author.username}'s DM`}`));
  console.log(chalk.yellow(`[Author]       : ${msg.author.username}#${msg.author.discriminator}`));
  console.log(chalk.red(`[Message]      : ${msg.content}`));


  if (content == 'oh please learn js'
  || content == 'oh please learn javascript') {
    const learnJsMessage = `**Useful links for learning JavaScript and Node**:

    • CodeCademy online course: <https://www.codecademy.com/learn/javascript>
    • Eloquent Javascript, free book: <http://eloquentjavascript.net/>
    • Some Node: <http://nodeschool.io/> and <https://www.codeschool.com/courses/real-time-web-with-node-js>
    * A great, ES6-updated, guide: <https://github.com/airbnb/javascript>
    • Discord.js Getting Started Guide: <https://eslachance.gitbooks.io/discord-js-bot-guide/content/>
    • discord.js documentation <http://discordjs.readthedocs.org/en/latest/>

    **We're glad to help where we can, but come with at least a basic understanding of the programming language you intend to use.**

    - _\@LuckyEvie_`;
    Bot.sendMessage(msg, learnJsMessage)
    .then(message => AddMessageCommandToDelete(msg, message));
  }
  else if (content == 'oh please read the docs'
  || content == 'oh please read docs') {
    Bot.sendMessage(msg, `**READ THE DOCS**\n\n <http://discordjs.readthedocs.org/en/latest/>`)
    .then(message => AddMessageCommandToDelete(msg, message));
  }
  else if (content == 'oh please troubleshoot'
  || content == 'oh please troubleshooting'
  || content == 'oh please docs trouble') {
    Bot.sendMessage(msg, `**READ THE DISCORD.JS TROUBLESHOOTING DOCS**\n\n <http://discordjs.readthedocs.org/en/latest/troubleshooting.html>`)
    .then(message => AddMessageCommandToDelete(msg, message));
  }
  else if (content == 'oh please music bot') {
    Bot.sendMessage(msg, 'https://giphy.com/gifs/vk7VesvyZEwuI')
    .then(message => AddMessageCommandToDelete(msg, message));
  }
  else if (content == 'oh please clean'
  || content == 'oh please clear') {
    console.log(chalk.bold.cyan('\n============= C O M M A N D ============'));
    debug(chalk.gray(`[CLEAN] Cleaning messages in ${msg.channel.name ? `#${msg.channel.name} in ${msg.server}` : `${msg.author.username}'s DM`}`));
    Bot.getChannelLogs(msg.channel, (err, logs) => {
      if (err) {
        error(err);
        return Bot.sendMessage(msg, 'Unable to clean messages :|');
      }
      debug(chalk.gray('[CLEAN] Filtering ' + logs.length + ' messages to clean..'));
      let botLogs = logs.filter(a => a.author.equals(Bot.user));
      debug(chalk.gray('[CLEAN] Cleaning ' + botLogs.length + ' messages...'));
      botLogs.forEach(elem => {
        Bot.deleteMessage(elem).catch(err => error(err.stack));
      });
      debug(chalk.gray('[CLEAN] Cleaned messages!'));
    });
  }
  else if (content == 'oh please scroll up') {
    Bot.sendMessage(msg, '**SCROLL UP.** The information you need has already been sent');
  }
  else if (content == 'oh please god no') {
    Bot.sendMessage(msg, 'https://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif');
  }
  else if (content == 'oh please ping') {
    let currentTime = new Date().getTime();
    let difference = currentTime - msg.timestamp;
    if (difference > 999) {
      difference = difference / 1000;
    }
    console.log(currentTime);
    console.log(msg.timestamp);
    Bot.sendMessage(msg, `Ping, Pong! Took ${difference} ${currentTime - msg.timestamp > 999 ? 's' : 'ms'}`);
  }
  else if (content == 'oh please help') {
    let message = [
      '',
      '_**OH PLEASE HELP**_',
      '_Prefix is \`oh please \`_',
      '',
      '**Commands**',
      '  • \`learn js\` - some links to learn javascript, including good discord.js guides',
      '  • \`read docs\` - the discord.js docs link',
      '  • \`troubleshooting\` - the discord.js docs troubleshooting page link',
      '  • \`scroll up\` - scroll up, you already have the information you need',
      '  • \`get hosting\` - a big list of free & paid hosting services',
      '  • \`codeblocks\` - how to use codeblocks',
      '  • \`show me a voice example\` - shows a voice example with discord.js',
      '  • \`detect wrong credentials\` - shows an example on how to detect wrong login credentials',
      '  • \`god no\` - oh god please don\'t make a music bot',
      '  • \`music bot\` - triggered please don\'t make a music bot',
      '  • \`ping\` - just a ping command :wink:',
      '  • \`invite\` - invite this bot to your server :slight_smile:',
      '',
      '**Aliases**',
      '  • \`learn js == learn javascript\`',
      '  • \`read docs == read the docs\`',
      '  • \`troubleshooting == troubleshoot == docs trouble\`',
      '  • \`codeblocks == code blocks\`',
      '  • \`get hosting == gimme hosting == hosting\`',
      '  • \`show me a voice example == voice example\`',
      '  • \`detect wrong credentials == detect wrong token == wrong token\`',
      ''
    ].join('\n');
    Bot.sendMessage(msg.author, message);
    if (msg.server) Bot.reply(msg, 'help has been sent to your DM')
    .then(message => Bot.deleteMessage(message, { wait: 5000 }));
  }
  else if (content.startsWith('oh please set nick') && msg.author.id == "175008284263186437") {
    let nick = msg.content.replace('oh please set nick ', '').replace('oh please set nick', '');
    Bot.setNickname(msg, nick, err => {
      nick = nick || "Oh Please Learn JS";
      if (err) {
        error(err);
        return Bot.sendMessage(msg, `=> Unable to set nickname to **${nick}**`);
      }
      Bot.sendMessage(msg, `=> Successfully set nickname to **${nick}**`, (err, newMsg) => {
        if (err) error(err);
        Bot.deleteMessage(newMsg, { wait: 5000 });
      });
    })
  }
  else if (content == 'oh please code blocks'
  || content == 'oh please codeblocks') {
    let message = [
      '**HOW TO USE CODEBLOCKS:**','',
      '\\`\\`\\`js',
      'const Discord = require(\'discord.js\');',
      '\\`\\`\\`',
      'will transform into', '',
      '\`\`\`js',
      'const Discord = require(\`discord.js\`);',
      '\`\`\`'
    ].join('\n');
    Bot.sendMessage(msg, message).then(cmdMsg => AddMessageCommandToDelete(msg, cmdMsg));
  }
  else if (content == 'oh please invite') {
    let message = [
      '**INVITE Oh Please TO YOUR SERVER:**',
      '<https://discordapp.com/oauth2/authorize?client_id=209744316762030091&scope=bot&permissions=67193856>'
    ];
    Bot.sendMessage(msg, message)
  }
  else if (content == 'oh please info') {
    let message = [
      '**INFO ABOUT Oh Please BOT:**',
      '',
      `I was made by ${msg.server ? '<@!175008284263186437>' : 'David Sevilla Martín'}. I was created because tons of people went to the #node_discord-js channel in the Discord API server to get help creating a bot while they themselves had no idea how to use JavaScript.`,
      'I was also created to get rid of music bots :slight_smile: and help the chat providing docs links, and resources to learn Javascript.'
    ];
    Bot.sendMessage(msg, message).then(cmdMsg => AddMessageCommandToDelete(msg, cmdMsg));
  }
  else if (content == 'oh please hosting'
  || content == 'oh please get hosting'
  || content == 'oh please gimme hosting') {
    let freeHosting = [{
      name: 'Openshift',
      url: 'https://www.openshift.com/',
      description: 'Openshift lets you have up to 3 free apps running 24/7 per account, and has different cartridges to suit your needs.'
    }, {
      name: 'Heroku',
      url: 'https://heroku.com',
      description: 'With a free account, Heroku makes your web apps sleep, but you can have a worker app (just process, no interface) running 24/7 until you reach the time limit for every month.'
    }];
    let paidHosting = [{
      name: 'OVH',
      url: 'https://www.ovh.com/us/vps/',
      description: 'Your own VPS starting at $3.49/month, with installation of additional storage and resources in a few clicks. Ubuntu Server or Debian are recommended for the OS'
    }, {
      name: 'Digital Ocean',
      url: 'https://m.do.co/c/a844b9f2c03e',
      description: 'Starting at $5/month (USD), you can have your own server with 20GB SSD Disk, and 512MB Memory in 1 minute. Every project is a droplet. Ubuntu is recommended for the OS'
    }, {
      name: 'Time4VPS',
      url: 'https://www.time4vps.eu/',
      description: 'Starting at €0.66/month, get 20GB Storage, 512MB Memory, 0.5TB Bandwidth, and Daily/Weekly backups.  Various Linux OS distributions, IP addons and instant cPanel/WHM licenses. 30-Day Money Back Guarantee.',
      warning: 'MAY NOT PROVIDE DDOS/HACKING PROTECTION'
    }];
    let message = [
      '_**FREE HOSTING**_', ''
    ];
    freeHosting.forEach(elem => {
      let hostingMsg = [
        `• **${elem.name}**`,
        `  - <${elem.url}>`,
        `  - ${elem.description}`
      ].join('\n')
      message.push(hostingMsg);
    });
    message = message.concat(['', '_**PAID HOSTING**_', '']);
    paidHosting.forEach(elem => {
      let hostingMsg = [
        `• **${elem.name}** ${elem.warning ? `_(${elem.warning})_` : ''}`,
        `  - <${elem.url}>`,
        `  - ${elem.description}`
      ].join('\n')
      message.push(hostingMsg);
    });

    Bot.sendMessage(msg, message).then(cmdMsg => AddMessageCommandToDelete(msg, cmdMsg));
  }
  else if (content == 'oh please stats') {
    let MemoryUsing = bytesToSize(process.memoryUsage().rss, 3)
    let Uptime = GetUptime();

    let message = [
      '**STATS**',
      '',
      `• Memory Usage : \`${MemoryUsing}\``,
      `• Uptime: \`${Uptime}\``,
      `• Messages Sent: \`${Stats.Messages.Sent}\``,
      `• Messages Received: \`${Stats.Messages.Received}\``,
    ];
    Bot.sendMessage(msg, message).then(cmdMsg => AddMessageCommandToDelete(msg, cmdMsg));
  }
  else if (content == 'oh please show me a voice example'
    || content == 'oh please voice example') {
    let message = [
      '**A VOICE EXAMPLE WITH DISCORD.JS**',
      '',
      '\`\`\`js',
      'if (msg.content.startsWith(prefix + "play")) {',
      '  let file = "./music/mysong.mp3";   // Path to a file on disk. Works for direct URLs but not youtube (because youtube urls are not files)!',
      '  let channel = msg.author.voiceChannel;  // Join the user\'s voice channel, or specify another',
      '',
      '  bot.joinVoiceChannel(channel).then(connection => {',
      '    connection.playFile(file)',
      '    .then(intent => {',
      '      intent.on("end", () => {',
      '        console.log("Playback Ended");',
      '        bot.leaveVoiceChannel(channel); // leave voice channel when done playing file',
      '      })',
      '      intent.on("error", (err) => {',
      '        console.log(\'Playback Error: \' + err);',
      '        bot.leaveVoiceChannel(channel);',
      '      });',
      '    })',
      '  })',
      '  .catch(err => {',
      '    console.log(\'Error joining voice channel: \' + err);',
      '  });',
      '}',
      '\`\`\`',
      '',
      '`playFile` docs: <http://discordjs.readthedocs.io/en/latest/docs_voiceconnection.html#playfile-path-options-callback>',
      'Need Youtube? Check out \`ytld-core\` which can provide a \`raw stream\` for \`playRawStream\`!'
    ];

    Bot.sendMessage(msg, message).then(cmdMsg => AddMessageCommandToDelete(msg, cmdMsg));
  }
  else if (content == 'oh please detect wrong token'
  || content == 'oh please detect wrong credentials'
  || content == 'oh please wrong token') {
    let message = [
      '**HOW TO DETECT IF LOGIN CREDENTIALS ARE INVALID**',
      '',
      '\`\`\`js',
      'let ready = false;',
      '',
      'bot.on(\'ready\', () => {',
      '  ready = true;',
      '  console.log(\'=> Logged In!\');',
      '});',
      '',
      'bot.loginWithToken(\'TOKEN HERE\', err => {',
      '  if (err) throw err;',
      '  console.log(\'=> Logging In...\');',
      '  setTimeout(() => {',
      '    if (!ready) console.log(\'=> Invalid token or the gateway is down\')',
      '  }, 7500);',
      '}',
      '\`\`\`'
    ];
    Bot.sendMessage(msg, message).then(cmdMsg => AddMessageCommandToDelete(msg, cmdMsg));
  }
});
Bot.on('messageDeleted', msg => {
  if (!msg) return false;

  if (commandMessages[msg.id]) {
    commandMessages[msg.id].delete()
    .then(() => {
    }).catch(err => {
      error(err.stack);
      delete commandMessages[msg.id];
    });
  }
});

function AddMessageCommandToDelete(userMsg, commandMsg) {
  commandMessages[userMsg.id] = commandMsg;
}

function bytesToSize(input, precision) {
  let index = Math.floor(Math.log(input) / Math.log(1024));
  if (unit >= unit.length) return input + ' B';
  return (input / Math.pow(1024, index)).toFixed(precision) + ' ' + unit[index] + 'B'
}

function GetUptime() {
  let sec_num = parseInt(process.uptime(), 10);
  let days = Math.floor(sec_num / 86400);
  sec_num %= 86400;
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);
  if (days < 10) days = "0" + days;
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  let time = '';
  if (days != '00') time += `${days} ${days == '01' ? 'day' : 'days'} `;
  if (days != '00' || hours != '00') time += `${hours} ${hours == '01' ? 'hour' : 'hours'} `;
  if (days != '00' || hours != '00' || minutes != '00') time += `${minutes} ${minutes == '01' ? 'minute' : 'minutes'} `;
  if (days != '00' || hours != '00' || minutes != '00' || seconds != '00') time += `${seconds} ${seconds == '01' ? 'second' : 'seconds'} `;
  return time;
}



Bot.on('ready', () => {
  ready = true;
  console.log(chalk.italic.cyan('=> Logged In!'));
});
Bot.on('error', error);
Bot.on('warn', error);
Bot.on('uncaughtException', error);

Bot.loginWithToken('MjA5NzQ0MzUxNDM2MzQxMjQ5.CoVZ9g.uBz-isysDuMmDjTWNCRM5SR0Svs', (err, token) => {
  if (err) return error(err);
  console.log(chalk.italic.cyan(`=> Logging in...`));
  console.log(chalk.italic.cyan(`=> Instant error... ${err}`));
  setTimeout(() => {
    if (!ready) console.log(chalk.italic.red(`=> ERROR: Token may be invalid or gateway is down`));
  }, 7500);
}).catch(error);
