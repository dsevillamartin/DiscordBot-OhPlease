const Graf = require('discord-graf');
const Log = require('../log').Logger;

const InfoMessage = [
  '**Oh Please**',
  'A bot made with discord.js v9 & `discord-graf` by @Gawdl3y#4670',
  '',
  `I was made by @datitisev#4934. I was created because tons of people went to the <#81385020756865024> channel in the Discord API server to get help creating a bot while they themselves had no idea how to use JavaScript.`,
  'I was also created to get rid of music bots :slight_smile: and help the chat providing docs links, and resources to learn Javascript, DiscordJS, and Eris.',
  'You can see the source code at <https://github.com/datitisev/DiscordBot-OhPlease>'
].join('\n');

class InfoCommand extends Graf.Command {
  constructor(bot) {
    super(bot, {
      name: 'info',
      argsCount: 0,
      description: 'Info',
      details: 'Uhhh...... info?',
      memberName: 'info',
      module: 'info'
    })
  }

  run(msg) {
    return Promise.resolve({ plain: InfoMessage });
  }
}

module.exports = InfoCommand;
