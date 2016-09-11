const Graf = require('discord-graf');
const Log = require('../log').Logger;

const TroubleshootDiscordJSMessage = [
  '**TROUBLESHOOTING DISCORD.JS**',
  '',
  'Join _Discord.js Official_ at https://discord.gg/bRCvFy9'
].join('\n');
const TroubleshootErisMessage = [
  '**TROUBLESHOOTING ERIS**',
  '',
  'Ask in <#178672669841948672> on Discord API'
].join('\n');

class TroubleshootingCommand extends Graf.Command {
  constructor(bot) {
    super(bot, {
      name: 'troubleshoot',
      aliases: ['troubleshooting', 'trouble'],
      argsCount: 1,
      description: 'Fix problems you may be having with d.js or Eris!',
      memberName: 'troubleshoot',
      module: 'general'
    });
  }

  run(msg, args) {
    Log.debug(args);
    if (args && args[0].toLowerCase() == 'eris') {
      return Promise.resolve({ plain: TroubleshootErisMessage });
    } else return Promise.resolve({ plain: TroubleshootDiscordJSMessage });
  }
}

module.exports = TroubleshootingCommand;
