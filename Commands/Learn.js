const Graf = require('discord-graf');
const Log = require('../log').Logger;

const LearnJSMessage = [
  '**USEFUL LINKS FOR LEARNING JavaScript and NodeJS**',
  '',
  ' • CodeCademy online course: <https://www.codecademy.com/learn/javascript>',
  ' • Eloquent Javascript, free book: <http://eloquentjavascript.net/>',
  ' • Some Node: <http://nodeschool.io/> and <https://www.codeschool.com/courses/real-time-web-with-node-js>',
  ' • A great, ES6-updated, guide: <https://github.com/airbnb/javascript>',
  ' • Javascript Reference/Docs (MDN): <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>',
  '',
  '**We\'re glad to help where we can, but come with at least a basic understanding of the programming language you intend to use.**',
  '',
  '- _\@LuckyEvie_'
].join('\n');

const LearnDiscordJSMessage = [
  '**USEFUL LINKS FOR LEARNING DISCORD.JS (v9)**',
  '',
  ' • Discord.js Getting Started Guide: <https://eslachance.gitbooks.io/discord-js-bot-guide/content/>',
  ' • discord.js documentation <http://hydrabolt.github.io/discord.js>',
  '',
  '**We\'re glad to help where we can, but come with at least a basic understanding of the programming language you intend to use.**',
  '',
  '- _\@LuckyEvie_'
].join('\n');

class LearnCommand extends Graf.Command {
  constructor(bot) {
    super(bot, {
      name: 'learn',
      argsCount: 1,
      description: 'Links to learn javascript',
      memberName: 'learn',
      module: 'general'
    });
  }

  run(msg, args) {
    if (args[0] == 'js' || args[0] == 'javascript') {
      return Promise.resolve({ plain: LearnJSMessage });
    } else if (args[0] == 'd.js' || args[0] == 'discord.js' || args[0] == 'discordjs') {
      return Promise.resolve({ plain: LearnDiscordJSMessage });
    } else {
      return Promise.resolve('Invalid args or none found. Valid args:\n - `js`\n - `d.js` \nUsage: `oh please learn (js/d.js)`');
    }
  }
}

module.exports = LearnCommand;
