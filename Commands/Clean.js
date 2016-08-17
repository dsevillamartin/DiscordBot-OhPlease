let Log = require('../log').Logger;

module.exports = bot => {

  bot.registerCommand('clean', msg => {


    bot.getMessages(msg.channel.id).then(messages => {
      Log.debug(`Got messages from #${msg.channel.name}...`);
      Log.debug(`Filtering ${messages.length} messages...`)
      let msgs = messages.filter(e => e.author.id == bot.user.id);

      Log.debug(`Deleting ${msgs.length} messages...`);

      msgs.forEach(message => {
        bot.deleteMessage(message.channel.id, message.id).catch(Log.error);
      });

      Log.debug(`Deleted ${msgs.length} messages!`);
    }).catch(Log.error);

  }, {
    description: 'cleans the bot\'s messages',
    fullDescription: 'Deletes all the bot\'s messages found in the latest 50 total messages on the channel'
  });

}
