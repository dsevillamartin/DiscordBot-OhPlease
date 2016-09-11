const Graf = require('discord-graf');
const Log = require('../log').Logger;

class ScrollUpCommand extends Graf.Command {
  constructor(bot) {
    super(bot, {
      name: 'scroll up',
      description: 'Scroll up!',
      memberName: 'scrollup',
      module: 'general',
      guildOnly: true
    });
  }

  run(msg, args) {
    return Promise.resolve({ plain: '**SCROLL UP!** The information you need has already been sent' });
  }
}

module.exports = ScrollUpCommand;
