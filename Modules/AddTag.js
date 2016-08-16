const Log = require('../log');
const prefix = 'oh please ';

const Tag = require('../Models').Tag

module.exports = bot => {

  bot.on('messageCreate', msg => {

    let server = msg.channel.guild ? msg.channel.guild.id : msg.channel.id;
    let channel = msg.channel.id;
    let content = msg.content.replace(prefix, '');

    if (server != '214866271639044097' && server != '175021235384614912') return false;

    if (!msg.content.startsWith(prefix) || !content.startsWith('tag add')) return false;

    let args = content.replace('tag add ', '').split(' ');
    let tagName = args[0];
    let tagContent = args.slice(1).join(' ');

    Tag.Get(tagName.toUpperCase()).then(tag => {
      if (tag) throw `Tag **${tagName}** already exists!`;

      return new Tag({
        name: tagName.toUpperCase(),
        content: tagContent,
        author: msg.author.id
      }).save()
    }).then(response => {
      bot.deleteMessage(msg.channel.id, msg.id);
      bot.createMessage(channel, `Tag **${tagName}** created successfully!`);
    }).catch(err => {
      if (typeof err == 'string') {
        bot.createMessage(channel, err).then(msg => {
          setTimeout(() => {
            bot.deleteMessage(msg.channel.id, msg.id);
          }, 10000)
        });
      } else {
        throw err;
      }
    });

  });

}
