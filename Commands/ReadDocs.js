const ReadDocsDiscordJS = [
  '**READ THE DOCS (DiscordJS)**',
  '',
  '<http://discordjs.readthedocs.org/en/latest/>'
].join('\n');

const ReadDocsEris = [
  '**READ THE DOCS (Eris)**',
  '',
  '_Docs_ - <https://abal.moe/Eris/docs.html>',
  '_Examples_ - <https://github.com/abalabahaha/eris/tree/master/examples>'
].join('\n');

module.exports = (bot, DeleteMessageCommand) => {

  const ReadTheDocs = msg => {
    if (msg.channel.id == '178672669841948672') {
      bot.createMessage(msg.channel.id, ReadDocsEris).then(DeleteMessageCommand(msg));
    } else {
      bot.createMessage(msg.channel.id, ReadDocsDiscordJS).then(DeleteMessageCommand(msg));
    }
  }

  let command = bot.registerCommand('read', msg => {})

  command.registerSubcommand('the', msg => {})
  .registerSubcommand('docs', ReadTheDocs);

  command.registerSubcommand('docs', ReadTheDocs);

}
