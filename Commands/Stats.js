const Graf = require('discord-graf');
const Log = require('../log').Logger;
const moment = require('moment');

require('moment-duration-format');

const Unit = ['', 'K', 'M', 'G', 'T', 'P'];
const BytesToSize = (input, precision) => {
  let index = Math.floor(Math.log(input) / Math.log(1024));
  if (Unit >= Unit.length) return input + ' B';
  return (input / Math.pow(1024, index)).toFixed(precision) + ' ' + Unit[index] + 'B';
};
const GetUptime = bot => {
  return moment.duration(bot.uptime).format('d[ days], h[ hours], m[ minutes, and ]s[ seconds]');
};

class StatsCommand extends Graf.Command {
  constructor(bot) {
    super(bot, {
      name: 'stats',
      argsCount: 0,
      description: 'Stats',
      details: 'Uhh... stats? Yeah...',
      memberName: 'stats',
      module: 'info'
    });
  }

  run(msg) {
    let bot = msg.client;
    let MemoryUsing = BytesToSize(process.memoryUsage().rss, 3);
    let Uptime = GetUptime(bot);

    const StatsMessage = [
      '**STATS**',
      '',
      `• Memory Usage : \`${MemoryUsing}\``,
      `• Uptime: \`${Uptime}\``,
      `• Servers: \`${bot.guilds.size}\``,
      `• Users: \`${bot.users.size}\``,
    ].join('\n');

    return Promise.resolve({ plain: StatsMessage });
  }
}

module.exports = StatsCommand;
