const TroubleshootingDiscordJS = [
  '**TROUBLESHOOTING DISCORD.JS**',
  '',
  '<http://discordjs.readthedocs.org/en/latest/troubleshooting.html>',
  'or ask in <#81385020756865024>'
].join('\n');

const TroubleshootingEris = [
  '**TROUBLESHOOTING ERIS**',
  '',
  'Ask in <#178672669841948672>'
].join('\n');

module.exports = (bot, DeleteMessageCommand) => {

  const Troubleshooting = msg => {
    if (msg.channel.id == '178672669841948672') {
      bot.createMessage(msg.channel.id, TroubleshootingEris).then(DeleteMessageCommand(msg));
    } else {
      bot.createMessage(msg.channel.id, TroubleshootingDiscordJS).then(DeleteMessageCommand(msg));
    }
  }

  let command = bot.registerCommand('troubleshooting', Troubleshooting, {
    aliases: ['troubleshoot']
  });

}
