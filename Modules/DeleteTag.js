const Log = require('../log');
const prefix = 'oh please ';

const Tag = require('../Models').Tag

module.exports = bot => {

  bot.on('messageCreate', msg => {

    let server = msg.channel.guild ? msg.channel.guild.id : msg.channel.id;
    let channel = msg.channel.id;
    let content = msg.content.replace(prefix, '');

    if (server != '214866271639044097' && server != '175021235384614912') return false;

    if (!msg.content.startsWith(prefix) || !content.startsWith('tag delete')) return false;

    let args = content.replace('tag delete ', '').split(' ');
    let tagName = args[0];

    Tag.Delete(tagName.toUpperCase()).then(tag => {
      if (!tag) throw `Tag **${tagName}** not found`;

      bot.deleteMessage(msg.channel.id, msg.id);
      bot.createMessage(channel, `Tag **${tagName}** was successfully deleted!`);

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
