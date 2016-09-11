const Graf = require('discord-graf');
const Log = require('../log').Logger;

const VoiceExampleDiscordJS = [
  '**A VOICE EXAMPLE WITH DISCORD.JS**',
  '',
  '\`\`\`js',
  'const Discord = require("discord.js");',
  'const yt = require(\'ytdl-core\');',
  'const client = new Discord.Client();',
  'client.login(" Y o u r   B o t   T o k e n ");',

  'client.on(\'message\', message => {',
  '  if (message.content.startsWith(\'++play\')) {',
  '    const voiceChannel = msg.member.voiceChannel;',
  '    if (!voiceChannel || voiceChannel.type !== \'voice\') {',
  '      return message.reply(`Please be in a voice channel first!`);',
  '    }',
  '    voiceChannel.join().then(connnection => {',
  '      let stream = yt("https://www.youtube.com/watch?v=dQw4w9WgXcQ", { audioonly: true });',
  '      connnection.playStream(stream);',
  '    });',
  '  }',
  '});',
  '\`\`\`',
  '',
  '`playFile` docs: <http://discordjs.readthedocs.io/en/latest/docs_voiceconnection.html#playfile-path-options-callback>',
  'Need Youtube? Check out \`ytld-core\` which can provide a \`raw stream\` for \`playRawStream\`!'
].join('\n');
const VoiceExampleEris = [
  '**A VOICE EXAMPLE WITH ERIS**',
  '',
  '\`\`\`js',
  'bot.joinVoiceChannel(msg.member.voiceState.channelID).catch((err) => { // Join the user\'s voice channel',
  '  bot.createMessage(msg.channel.id, "Error joining voice channel: " + err.message); // Notify the user if there is an error',
  '  console.log(err); // Log the error',
  '}).then((connection) => {',
  '  if(connection.playing) { // Stop playing if the connection is playing something',
  '    connection.stopPlaying();',
  '  }',
  '  connection.playFile(filename); // Play the file and notify the user',
  '  bot.createMessage(msg.channel.id, `Now playing **${filename}**`);',
  '  connection.once("end", () => {',
  '    bot.createMessage(msg.channel.id, `Finished **${filename}**`); // Say when the file has finished playing',
  '  });',
  '});',
  '\`\`\`',
  '',
  '_Excerpt from <https://github.com/abalabahaha/eris/blob/master/examples/playFile.js>_'
].join('\n');

class VoiceExampleCommand extends Graf.Command {
  constructor(bot) {
    super(bot, {
      name: 'voice example',
      aliases: ['show me a voice example'],
      description: 'Show me a voice example; default d.js',
      memberName: 'voice-example',
      module: 'general',
      usage: 'voice example [d.js/eris]',
      examples: ['voice example', 'voice example eris']
    })
  }

  run(msg, args) {
    args = args.join(' ').replace('example', '').replace('me a voice example', '').split(' ').slice(1, 2);

    if (args[0] == 'eris') {
      return Promise.resolve({ plain: VoiceExampleEris });
    } else {
      return Promise.resolve({ plain: VoiceExampleDiscordJS });
    }
  }
}

module.exports = VoiceExampleCommand;
