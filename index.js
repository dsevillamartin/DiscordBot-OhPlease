'use strict';

const Discord = require('discord.js');
const debug = require('debug')('bot:client');
let Bot = new Discord.Client({
  autoReconnect: true
});

const message = `**Useful links for learning JavaScript and Node**:

• CodeCademy online course: <https://www.codecademy.com/learn/javascript>
• Eloquent Javascript, free book: <http://eloquentjavascript.net/>
• Some Node: <http://nodeschool.io/> and <https://www.codeschool.com/courses/real-time-web-with-node-js>
* A great, ES6-updated, guide: <https://github.com/airbnb/javascript>
• Discord.js Getting Started Guide: <https://eslachance.gitbooks.io/discord-js-bot-guide/content/>
• discord.js documentation <http://discordjs.readthedocs.org/en/latest/>

**We're glad to help where we can, but come with at least a basic understanding of the programming language you intend to use.**

- _\@LuckyEvie_`;

Bot.on('message', msg => {
  if (msg.channel.id != '81385020756865024') return false;

  let content = msg.content.toLowerCase()
  if (!content.startsWith('oh please')) return false;

  if (content == 'oh please learn js'
  || content == 'oh please learn javascript') {
    Bot.sendMessage(msg, message);
  }
  if (content == 'oh please read the docs'
  || content == 'oh please read docs') {
    Bot.sendMessage(msg, `**READ THE DOCS**\n\n <http://discordjs.readthedocs.org/en/latest/>`);
  }
  if (content == 'oh please clean'
  || content == 'oh please clear') {
    debug('Cleaning Messages...');
    Bot.getChannelLogs(msg.channel, (err, logs) => {
      if (err) {
        debug(err);
        return Bot.sendMessage(msg, 'Unable to clean messages :|');
      }
      debug('Filtering ' + logs.length + ' messages to clean..')
      let botLogs = logs.filter(a => a.author.equals(Bot.user));
      debug('Cleaning ' + botLogs.length + ' messages...');
      botLogs.forEach(elem => {
        Bot.deleteMessage(elem);
      });
      debug('Cleaned messages!');
    });
  }

  if (content == 'oh please scroll up') {
    Bot.sendMessage(msg, '**SCROLL UP.** The information you need has already been sent');
  }

  if (content.startsWith('oh please set nick') && msg.author.id == "175008284263186437") {
    let nick = msg.content.replace('oh please set nick ', '').replace('oh please set nick', '');
    Bot.setNickname(msg, nick, err => {
      nick = nick || "Oh Please Learn JS";
      if (err) {
        debug(err);
        return Bot.sendMessage(msg, `=> Unable to set nickname to **${nick}**`);
      }
      Bot.sendMessage(msg, `=> Successfully set nickname to **${nick}**`, (err, newMsg) => {
        if (err) debug(err);
        Bot.deleteMessage(newMsg, { wait: 5000 });
      });
    })
  }
});

Bot.on('ready', () => {
  debug('Bot is online!');
});
Bot.on('error', debug);
Bot.on('warn', debug);
Bot.on('uncaughtException', debug);

Bot.loginWithToken('MjA5NzQ0MzUxNDM2MzQxMjQ5.CoErJg.MbxwGp2OAJfWXG7aDOxTxUYQDjg', err => {
  if (err) debug(err);
  debug('Logged In!');
});
