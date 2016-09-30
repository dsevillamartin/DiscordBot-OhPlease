const Graf = require('discord-graf');
const Log = require('../log').Logger;
const ServerConfig = require('../Models/ServerConfig');

const ViewMessage = [
  '```xl',
  `CURRENT SERVER CONFIGURATION`,
  'This is your current server\'s configuration.',
  '',
];

class ConfCommand extends Graf.Command {
  constructor(bot) {
    super(bot, {
      name: 'conf',
      description: 'Server config',
      memberName: 'conf',
      module: 'util',
      argsType: 'multiple'
    });
  }

  hasPermission(guild, user) {
    return guild.owner.id === user.id
  }

  run(msg, args) {
    if (args[0] == 'view') {

      let server_conf = ServerConfig.Get(msg.guild.id);
      let message = ViewMessage;
      for (let config in server_conf) {
        let value = server_conf[config];
        message.push(`${config}  : ${value}`);
      }

      message.push('```');

      return Promise.resolve({ plain: message.join('\n') });

    } else if (args[0] == 'get') {

      let property = args[1];
      let value = ServerConfig.Get(msg.guild.id)[property];

      if (!property) return Promise.resolve({ plain: `Configuration key \`${property}\` doesn't exist`});

      return Promise.resolve({
        plain: `Configuration key \`${property}\` currently set to \`${value}\``
      });
      
    } else {
      return Promise.resolve({});
    }
  }
}

module.exports = ConfCommand;
