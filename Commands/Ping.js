const Graf = require('discord-graf');
const Log = require('../log').Logger;

class PingCommand extends Graf.Command {
  constructor(bot) {
    super(bot, {
      name: 'ping',
      argsCount: 0,
      description: 'Ping!',
      details: 'This command could be used to check if the bot is up. Or entertainment when you\'re bored.',
      memberName: 'ping',
      module: 'info'
    });
  }

  run(msg) {
    let bot = msg.client;

    let currentTime = new Date().getTime();
    let difference = currentTime - msg.timestamp;
    if (difference > 999) {
      difference = difference / 1000;
    }

    return Promise.resolve({ plain: `Ping, Pong! Took ${difference} ${currentTime - msg.timestamp > 999 ? 's' : 'ms'}` });
  }
}

module.exports = PingCommand;
