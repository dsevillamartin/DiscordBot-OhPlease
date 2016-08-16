const Log = require('../log');
const prefix = 'oh please ';

const Tag = require('../Models').Tag

module.exports = (bot) => {

  bot.on('messageCreate', msg => {

    let server = msg.channel.guild ? msg.channel.guild.id : msg.channel.id;
    let channel = msg.channel.id;

    if (server != '214866271639044097' && server != '175021235384614912') return false;

    let content = msg.content.replace(prefix, '');

    if (!msg.content.startsWith(prefix) || content == 'help tag' || content.startsWith('tag create') || content.startsWith('tag delete')) return false;

    let args = content.split(' ');
    let tagName = args[0].toUpperCase();

    Tag.Get(tagName).then(tag => {
      if (!tag) return false;

      let author = msg.channel.guild.members.filter(e => {
        return e.id == tag.author
      })[0];

      let authorName = author ? `@${author.user.username}#${author.user.discriminator}` : `<@!${tag.author}>`;

      let message = [
        tag.content,
        '',
        ` ~ ${authorName}`
      ].join('\n')

      bot.createMessage(channel, message);
    }).catch(err => {
      if (typeof err == 'string') {
        bot.createMessage(channel, err).then(msg => {
          setTimeout(() => {
            bot.deleteMessage(msg.channel.id, msg.id);
          }, 2500)
        });
      } else {
        throw err;
      }
    })

  });

}
