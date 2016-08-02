module.exports = (bot, DeleteMessageCommand) => {

  bot.registerCommand('music', () => {})
  .registerSubcommand('bot', msg => {
    bot.createMessage(msg.channel.id, 'https://giphy.com/gifs/vk7VesvyZEwuI').then(DeleteMessageCommand(msg));
  });

}
