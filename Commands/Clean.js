const Graf = require('discord-graf');
const Log = require('../log').Logger;

// module.exports = bot => {
//
//   bot.registerCommand('clean', msg => {
//
//
//     bot.getMessages(msg.channel.id).then(messages => {
//       Log.debug(`Got messages from #${msg.channel.name}...`);
//       Log.debug(`Filtering ${messages.length} messages...`)
//       let msgs = messages.filter(e => e.author.id == bot.user.id);
//
//       Log.debug(`Deleting ${msgs.length} messages...`);
//
//       msgs.forEach(message => {
//         bot.deleteMessage(message.channel.id, message.id).catch(Log.error);
//       });
//
//       Log.debug(`Deleted ${msgs.length} messages!`);
//     }).catch(Log.error);
//
//   }, {
//     description: 'cleans the bot\'s messages',
//     fullDescription: 'Deletes all the bot\'s messages found in the latest 50 total messages on the channel'
//   });
//
// }

class CleanCommand extends Graf.Command {
  constructor(bot) {
    super(bot, {
      name: 'clean',
      aliases: ['clear'],
      argsCount: 0,
      description: 'Clean the bot\'s messages',
      details: 'Cleans the bot\'s messages found in the last 100 messages of that channel',
      memberName: 'clean',
      module: 'util'
    });
  }

  run(msg) {
    let bot = msg.client;

    return msg.channel.fetchMessages({
      limit: 100
    }).then(messages => {
      Log.debug(`Got messages from #${msg.channel.name}...`);
      Log.debug(`Filtering ${messages.size} messages...`);

      return Promise.resolve(messages.filter(e => e.author.id == bot.user.id));
    }).then(msgs => {
      Log.debug(`Deleting ${msgs.size} messages...`);

      if (!msg.guild) return msgs.forEach(message => message.delete().catch(Log.error.bind(Log)));

      return msg.guild.fetchMember(bot.user.id).then(member => {
        if (member.hasPermission('MANAGE_MESSAGES')) {
          return msg.channel.bulkDelete(msgs).catch(Log.error.bind(Log));
        } else {
          return msgs.forEach(message => message.delete().catch(Log.error.bind(Log)));
        }
      });
    }).then(() => {
      return { plain: ':white_check_mark:' };
    })
  }
}

module.exports = CleanCommand;
