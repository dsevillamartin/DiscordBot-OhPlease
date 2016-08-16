const Log = require('../log').Logger;
const prefix = 'oh please ';

module.exports = bot => {

  bot.on('messageCreate', msg => {
    if (!msg.content.startsWith(prefix)) return false;

    let channel = msg.channel;
    let server = msg.channel.guild;
    let author = msg.author;

    let message = `${server.name} > #${channel.name} > @${author.username}#${author.discriminator} : ${msg.content}`;

    Log.message(message);

  });

}
