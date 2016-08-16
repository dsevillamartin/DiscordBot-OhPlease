const Log = require('../log');
const prefix = 'oh please ';

const Tag = require('../Models').Tag

module.exports = (bot) => {

  require('./Tag')(bot);
  require('./TagHelp')(bot);
  require('./AddTag')(bot);
  require('./DeleteTag')(bot);

  bot.on('messageCreate', msg => {

    let server = msg.channel.guild ? msg.channel.guild.id : msg.channel.id;
    let channel = msg.channel.id;
    let content = msg.content.replace(prefix, '');

    if (server != '214866271639044097' && server != '175021235384614912') return false;

    if (!msg.content.startsWith(prefix) || content != 'tag list') return false;

    Tag.Find().then(tags => {
      let tagsArray = [];
      tags.map(tag => {
        tagsArray.push(tag.name.toLowerCase());
      });

      let message = tagsArray.length ? `**TAGS**\n${tagsArray.join(', ')}` : '**NO TAGS FOUND**';

      bot.createMessage(channel, message);
    })

  });

}
