module.exports = (bot, DeleteMessageCommand) => {

  const CatchOutput = msg => {
    let message = [
      '**HOW TO CATCH ERRORS WITH PROMISES**',
      '',
      '\`\`\`js',
      'FUNCTION_THAT_RETURNS_PROMISE.then(output => {',
      '  // do something with the output',
      '}).catch(err => {',
      '  // do something with the error',
      '})',
      '\`\`\`'
    ].join('\n');

    bot.createMessage(msg.channel.id, message).then(DeleteMessageCommand(msg));
  }

  bot.registerCommand('catch', msg => {})
  .registerSubcommand('output', CatchOutput);

}
