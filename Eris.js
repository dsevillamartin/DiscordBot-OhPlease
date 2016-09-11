let { debug, error } = require('./log');
let chalk = require('chalk');
let Log = require('./log').Logger;
let { Bot } = require('discord-graf');

const version = 'dev';
const name = 'Oh Please Beta';
const token = process.env.TOKEN;

const bot = new Bot({
  name, version, token,
  clientOptions: {
    disableEveryone: true
  },
  commandPrefix: 'oh please beta',
  owner: '175008284263186437'
});

let ready = false;

// let DeleteMessageCommand = require('./Commands/DeleteMessageCommand')(bot);

// bot.on('ready', () => {
//   ready = true;
//   Log.info(chalk.cyan('=> Logged in!'));
// });

let Commands = [
  require('./Commands/Clean'),
  require('./Commands/Ping'),
  require('./Commands/Info'),
  require('./Commands/Stats'),
  require('./Commands/Invite'),
  require('./Commands/SetNick'),
  //
  require('./Commands/Hosting'),
  require('./Commands/Learn'),
  require('./Commands/Troubleshooting'),
  require('./Commands/ScrollUp'),
  require('./Commands/GodNo'),
  require('./Commands/MusicBot'),
  require('./Commands/VoiceExample'),
  require('./Commands/Codeblocks'),
  require('./Commands/CatchOutput'),
]

// require('./Modules/Tags')(bot);
// require('./Modules/CommandLogger')(bot);

// bot.on('error', (err, id) => {
//   let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
//   bot.getDMChannel('175008284263186437').then(DMChannel => {
//     bot.createMessage(DMChannel.id, `\`ERROR IN SHARD ${id}\`\n\`\`\`sh\n${errorMsg}\n\`\`\``);
//   }).catch(error);
//
//   Log.error(errorMsg);
// });

process.on('uncaughtException', (err) => {
  let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
  // bot.getDMChannel('175008284263186437').then(DMChannel => {
  //   bot.createMessage(DMChannel.id, `\`UNCAUGHT EXCEPTION\`\n\`\`\`sh\n${errorMsg}\n\`\`\``);
  // }).catch(error);

 Log.error(errorMsg);
});

bot.registerModules([
  ['general', 'General'],
  ['info', 'Info'],
  ['util', 'Util'],
  ['modules', 'Modules'],
]).registerDefaultCommands({
  about: false,
  modRoles: false,
  channels: false
}).registerCommands(Commands).createClient();
//
// bot.connect().then(() => {
//   Log.info(chalk.cyan('=> Logging in...'));
//   setTimeout(() => {
//     if (!ready) Log.error(chalk.red('=> Invalid token or gateway may be down'));
//   }, 7500)
// }).catch(err => {
//   error(err);
// });

module.exports = bot;
