const Graf = require('discord-graf');
const Log = require('../log').Logger;

class MusicBotCommand extends Graf.Command {
  constructor(bot) {
    super(bot, {
      name: 'music bot',
      description: 'Really??? ANOTHER ONE???',
      memberName: 'musicbot',
      module: 'general'
    });
  }

  run(msg, args) {
    return Promise.resolve({ plain: '**TRIGGERED**\nhttps://giphy.com/gifs/vk7VesvyZEwuI' });
  }
}

module.exports = MusicBotCommand;
