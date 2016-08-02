const prefix = 'oh please';
const learnJsMessage = [
  '**USEFUL LINKS FOR LEARNING JavaScript and NodeJS**',
  '',
  ' • CodeCademy online course: <https://www.codecademy.com/learn/javascript>',
  ' • Eloquent Javascript, free book: <http://eloquentjavascript.net/>',
  ' • Some Node: <http://nodeschool.io/> and <https://www.codeschool.com/courses/real-time-web-with-node-js>',
  ' • A great, ES6-updated, guide: <https://github.com/airbnb/javascript>',
  '',
  '**We\'re glad to help where we can, but come with at least a basic understanding of the programming language you intend to use.**',
  '',
  '- _\@LuckyEvie_'
].join('\n');
const learnDiscordJSMessage = [
  '**USEFUL LINKS FOR LEARNING Discord.JS**',
  '',
  ' • Discord.js Getting Started Guide: <https://eslachance.gitbooks.io/discord-js-bot-guide/content/>',
  ' • discord.js documentation <http://discordjs.readthedocs.org/en/latest/>',
  '',
  '**We\'re glad to help where we can, but come with at least a basic understanding of the programming language you intend to use.**',
  '',
  '- _\@LuckyEvie_'
].join('\n');

module.exports = (bot, DeleteMessageCommand) => {

  let command = bot.registerCommand('learn', msg => {
    bot.createMessage(msg.channel.id, 'oh please help learn').then(msg => {
      bot.deleteMessage(msg.channel.id, msg.id);
    });
  }, {
    description: 'help for learn subcommands',
    fullDescription: 'Help for learn subcommands'
  });

  command.registerSubcommand('js', msg => {
    bot.createMessage(msg.channel.id, learnJsMessage).then(DeleteMessageCommand(msg));
  }, {
    description: '4 useful links for learning javascript',
    fullDescription: '4 useful links for learning javascript, including a ES6 guide',
    aliases: ['javascript']
  });

  command.registerSubcommand('discord.js', msg => {
    bot.createMessage(msg.channel.id, learnDiscordJSMessage).then(DeleteMessageCommand(msg));
  }, {
    description: '2 useful links for developing a discord.js bot',
    fullDescription: '2 useful links for developing a Discord.JS bot, including a Getting Started guide by LuckyEvie',
    aliases: ['d.js']
  });

};
