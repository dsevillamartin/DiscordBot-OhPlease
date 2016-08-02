module.exports = (bot, DeleteMessageCommand) => {

  const Codeblocks = msg => {
    let message = [
      '**HOW TO USE CODEBLOCKS:**',
      '',
      '\\`\\`\\`js',
      'const Discord = require(\'discord.js\');',
      '\\`\\`\\`',
      'will transform into',
      '',
      '\`\`\`js',
      'const Discord = require(\`discord.js\`);',
      '\`\`\`'
    ].join('\n');

    bot.createMessage(msg.channel.id, message).then(DeleteMessageCommand(msg));
  }

  let command = bot.registerCommand('use', msg => {})

  command.registerSubcommand('codeblocks', Codeblocks);
  
  command.registerSubcommand('code', msg => {})
  .registerSubcommand('blocks', Codeblocks);

  bot.registerCommand('codeblocks', Codeblocks);

}
