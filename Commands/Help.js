const HelpMessage = [
  'Oh Please - Oh Please bot built in Eris',
  'by <@!175008284263186437>',
  '',
  '**Commands**:',
  '  **help** - this help message',
  '  **invite** - invite Oh Please to your server',
  '  **info** - info about Oh Please',
  '  **learn js** - some links to learn javascript & node',
  '  **learn d.js** - two useful links for developing a bot with discord.js',
  '  **read docs** - read the docs of the corresponding library, if <#178672669841948672> uses Eris, otherwise defaults to d.js',
  '  **troubleshooting** - gives some links for troubleshooting, depend on library, eris & d.js set up',
  '  **show me a voice example** - sends a voice example code, depends on library, eris & d.js set up',
  '  **scroll up** - oh please scroll up :eyes:',
  '  **detect wrong token**  - know if the token didn\'t work in d.js',
  '  **god no** - oh god please no',
  '  **music bot** - #triggered',
  '  **ping** - just a ping command :slight_smile:',
].join('\n');

module.exports = bot => {

  bot.registerCommand('help', msg => {
    bot.getDMChannel(msg.author.id).then(DMChannel => {
      return bot.createMessage(DMChannel.id, HelpMessage);
    }).then(() => {
      if (msg.channel.guild) return bot.createMessage(msg.channel.id, `<@${msg.author.id}>, help has been sent to your DM`);
    }).then(msg => {
      if (!msg) return false;
      setTimeout(() => {
        bot.deleteMessage(msg.channel.id, msg.id);
      }, 5000);
    }).catch(err => { throw err });
  });

}
