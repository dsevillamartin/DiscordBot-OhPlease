module.exports = bot => {
  bot.registerCommand('setnick', (msg, args) => {
    console.log(chalk.green(args));
    let nick = args.length ? args.join(' ') : 'Oh Please';
    bot.editNickname(msg.channel.guild.id, nick).then(() => {
      return bot.createMessage(msg.channel.id, `=> Successfully set nickname to **${nick}**`)
    }).then(msg => {
      setTimeout(() => {
        bot.deleteMessage(msg.channel.id, msg.id);
      }, 5000);
    });
  }, {
    description: 'set the bot\'s nickname',
    caseInsensitive: true,
    aliases: ['nick'],
    fullDescription: 'This command changes the bot\'s nickname',
    requirements: {
      userIDs: ['175008284263186437']
    }
  });
}
