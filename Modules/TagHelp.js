const Log = require('../log');
const prefix = 'oh please ';

// const Tag = require('../Models').Tag

module.exports = (bot) => {

  bot.on('messageCreate', msg => {

    let server = msg.channel.guild ? msg.channel.guild.id : msg.channel.id;
    let channel = msg.channel.id;

    if (server != '214866271639044097' && server != '175021235384614912') return false;

    let content = msg.content.replace(prefix, '');

    if (!msg.content.startsWith(prefix) || content != 'tag help') return false;

    const HelpMessage = [
      '**TAGS HELP**',
      '',
      '  `oh please tag help` - show tags help',
      '  `oh please tag list` - show all tags',
      '  `oh please <TAG>` - get tag, if it doesn\'t exist no error is given',
      '  `oh please tag create <NAME> <CONTENT>` - create tag',
      '  `oh please tag delete <NAME>` - delete tag',
    ].join('\n')

    bot.createMessage(channel, HelpMessage);

  });

}
