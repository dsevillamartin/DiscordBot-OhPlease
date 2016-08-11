let { debug, error } = require('./log');
let chalk = require('chalk');
let Eris = require('eris');

let bot = new Eris.CommandClient(require('./CONFIG.json').token, {}, {
  description: 'Oh Please bot built in eris',
  owner: 'datitisev#4934',
  name: 'Oh Please',
  prefix: 'oh please ',
  ignoreBots: false,
  ignoreSelf: false,
  defaultHelpCommand: false
});
let ready = false;

let DeleteMessageCommand = require('./Commands/DeleteMessageCommand')(bot);

bot.on('ready', () => {
  ready = true;
  console.log(chalk.cyan('=> Logged in!'));
});

require('./Commands/Help')(bot, DeleteMessageCommand);
require('./Commands/Clean')(bot, DeleteMessageCommand);
require('./Commands/Learn')(bot, DeleteMessageCommand);
require('./Commands/VoiceExample')(bot, DeleteMessageCommand);
require('./Commands/ReadDocs')(bot, DeleteMessageCommand);
require('./Commands/Troubleshooting')(bot, DeleteMessageCommand);
require('./Commands/Codeblocks')(bot, DeleteMessageCommand);
require('./Commands/Hosting')(bot, DeleteMessageCommand);
require('./Commands/GodNo')(bot, DeleteMessageCommand);
require('./Commands/Invite')(bot, DeleteMessageCommand);
require('./Commands/Info')(bot, DeleteMessageCommand);
require('./Commands/WrongCredentials')(bot, DeleteMessageCommand);
require('./Commands/Stats')(bot, DeleteMessageCommand);
require('./Commands/SetNick')(bot, DeleteMessageCommand);
require('./Commands/MusicBot')(bot, DeleteMessageCommand);
require('./Commands/Ping')(bot, DeleteMessageCommand);
require('./Commands/ScrollUp')(bot, DeleteMessageCommand);

bot.on('error', (err, id) => {
  let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
  bot.getDMChannel('175008284263186437').then(DMChannel => {
    bot.createMessage(DMChannel.id, `\`ERROR IN SHARD ${id}\`\n\`\`\`sh\n${errorMsg}\n\`\`\``);
  }).catch(error);

  error(errorMsg);
});

process.on('uncaughtException', (err) => {
  let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
  bot.getDMChannel('175008284263186437').then(DMChannel => {
    bot.createMessage(DMChannel.id, `\`UNCAUGHT EXCEPTION\`\n\`\`\`sh\n${errorMsg}\n\`\`\``);
  }).catch(error);

  error(errorMsg);
});

bot.connect().then(() => {
  console.log(chalk.cyan('=> Logging in...'));
  setTimeout(() => {
    if (!ready) console.log(chalk.red('=> Invalid token or gateway may be down'));
  }, 7500)
}).catch(err => {
  error(err);
});

module.exports = bot;
