const Graf = require('discord-graf');
const Log = require('../log').Logger;

class GodNoCommand extends Graf.Command {
  constructor(bot) {
    super(bot, {
      name: 'god no',
      description: 'NO GOD PLEASE NO',
      memberName: 'godno',
      module: 'general'
    });
  }

  run(msg, args) {
    return Promise.resolve({ plain: '**NO GOD PLEASE NO**\nhttps://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif' });
  }
}

module.exports = GodNoCommand;
