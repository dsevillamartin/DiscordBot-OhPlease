const VoiceExampleDiscordJS = [
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

module.exports = (bot, DeleteMessageCommand) => {
  const VoiceExample = msg => {
    if (msg.channel.id == '178672669841948672') {
      bot.createMessage(msg.channel.id, VoiceExampleEris).then(DeleteMessageCommand(msg));
    } else {
      bot.createMessage(msg.channel.id, VoiceExampleDiscordJS).then(DeleteMessageCommand(msg));
    }
  }

  bot.registerCommand('show', msg => {})
  .registerSubcommand('me', msg => {})
  .registerSubcommand('a', msg => {})
  .registerSubcommand('voice', msg => {})
  .registerSubcommand('example', VoiceExample);

  bot.registerCommand('voice', msg => {})
  .registerSubcommand('example', VoiceExample);

}
