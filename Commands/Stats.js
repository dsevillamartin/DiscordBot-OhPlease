const Graf = require('discord-graf');
const Log = require('../log').Logger;

const Unit = ['', 'K', 'M', 'G', 'T', 'P'];
const BytesToSize = (input, precision) => {
  let index = Math.floor(Math.log(input) / Math.log(1024));
  if (Unit >= Unit.length) return input + ' B';
  return (input / Math.pow(1024, index)).toFixed(precision) + ' ' + Unit[index] + 'B'
}
const GetUptime = () => {
  let sec_num = parseInt(process.uptime(), 10);
  let days = Math.floor(sec_num / 86400);
  sec_num %= 86400;
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);
  if (days < 10) days = "0" + days;
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  let time = '';
  if (days != '00') time += `${days} ${days == '01' ? 'day' : 'days'} `;
  if (days != '00' || hours != '00') time += `${hours} ${hours == '01' ? 'hour' : 'hours'} `;
  if (days != '00' || hours != '00' || minutes != '00') time += `${minutes} ${minutes == '01' ? 'minute' : 'minutes'} `;
  if (days != '00' || hours != '00' || minutes != '00' || seconds != '00') time += `${seconds} ${seconds == '01' ? 'second' : 'seconds'} `;
  return time;
}

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
    let MemoryUsing = BytesToSize(process.memoryUsage().rss, 3)
    let Uptime = GetUptime();

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
