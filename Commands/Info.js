const InfoMessage = [
  '**INFO**',
  '',
  `I was made by <@!175008284263186437>. I was created because tons of people went to the <#81385020756865024> channel in the Discord API server to get help creating a bot while they themselves had no idea how to use JavaScript.`,
  'I was also created to get rid of music bots :slight_smile: and help the chat providing docs links, and resources to learn Javascript, DiscordJS, and Eris.'
].join('\n');

module.exports = (bot, DeleteMessageCommand) => {

  bot.registerCommand('info', msg => {
    bot.createMessage(msg.channel.id, InfoMessage).then(DeleteMessageCommand(msg));
  });
}
