const Graf = require('discord-graf');
const Log = require('../log').Logger;

class SetNicknameCommand extends Graf.Command {
  constructor(bot) {
    super(bot, {
      name: 'nick',
      aliases: ['nickname'],
      argsType: 'multiple',
      description: 'Change bot\'s nickname; bot owner only',
      memberName: 'nick',
      module: 'util',
      guildOnly: true
    });
  }

  hasPermission(guild, user) {
    return user.id === '175008284263186437';
  }

  run(msg, args) {

    return msg.guild.fetchMember(msg.client.user.id).then(BotUser => {
      return BotUser.setNickname(args.join(' '));
    }).then(() => {
      return msg.channel.sendMessage(`=> Successfully set nickname to **${args[0] ? args.join(' ') : 'Oh Please Beta'}**!`).then(msg => setTimeout(() => msg.delete(), 5000));
    }).catch(Log.error.bind(this));
  }
}

module.exports = SetNicknameCommand;
