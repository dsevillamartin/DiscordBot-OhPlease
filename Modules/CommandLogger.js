const Log = require('../log').Logger;
const prefix = 'oh please ';

module.exports = bot => {

  bot.on('messageCreate', msg => {
    if (!msg.content.startsWith(prefix)) return false;

    // let channel = msg.channel.name;
    // let server = msg.channel.guild.name;
    let author = msg.author;
    let channel = msg.channel.guild ? `#${msg.channel.name}` : `${author.username}#${author.discriminator}`;
    let server = msg.channel.guild ? msg.channel.guild.name : `Private Message`;

    let message = `${server} > ${channel} > @${author.username}#${author.discriminator} : ${msg.content}`;

    Log.message(message);

  });

}
