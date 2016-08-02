let { error } = require('../log');

module.exports = bot => {

  bot.registerCommand('clean', msg => {

    console.log(`Getting messages from #${msg.channel.name}...`);

    bot.getMessages(msg.channel.id).then(messages => {
      console.log(`Filtering ${messages.length} messages...`)
      let msgs = messages.filter(e => e.author.id == bot.user.id);

      console.log(`Deleting ${msgs.length} messages...`);

      msgs.forEach(message => {
        bot.deleteMessage(message.channel.id, message.id).catch(error);
      });

      console.log(`Deleted ${msgs.length} messages!`);
    })

  }, {
    description: 'cleans the bot\'s messages',
    fullDescription: 'Deletes all the bot\'s messages found in the latest 50 total messages on the channel'
  });

}
