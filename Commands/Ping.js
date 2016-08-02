module.exports = (bot, DeleteMessageCommand) => {
  bot.registerCommand('ping', (msg, args) => {
    let currentTime = new Date().getTime();
    let difference = currentTime - msg.timestamp;
    if (difference > 999) {
      difference = difference / 1000;
    }
    bot.createMessage(msg.channel.id, `Ping, Pong! Took ${difference} ${currentTime - msg.timestamp > 999 ? 's' : 'ms'}`).then(DeleteMessageCommand(msg));
  }, {
    description: 'Pong!',
    caseInsensitive: true,
    fullDescription: 'This command could be used to check if the bot is up. Or entertainment when you\'re bored.'
  });
}
