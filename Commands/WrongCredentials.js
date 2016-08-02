const WrongCredentialsMessage = [
  '**HOW TO DETECT IF LOGIN CREDENTIALS ARE INVALID IN DISCORD.JS**',
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
  '\`\`\`',
  '',
  '_Eris returns a **401 Unauthorized** when you introduce wrong credentials_'
].join('\n');

const EmptyFunction = () => {};

module.exports = (bot, DeleteMessageCommand) => {

  const WrongCredentials = msg => {
    bot.createMessage(msg.channel.id, WrongCredentialsMessage).then(DeleteMessageCommand(msg));
  }

  let command = bot.registerCommand('detect', EmptyFunction)
  .registerSubcommand('wrong', EmptyFunction);

  command.registerSubcommand('credentials', WrongCredentials);
  command.registerSubcommand('token', WrongCredentials);

  let command2 = bot.registerCommand('wrong', EmptyFunction);

  command2.registerSubcommand('credentials', WrongCredentials);
  command2.registerSubcommand('token', WrongCredentials);

}
