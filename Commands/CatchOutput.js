const Graf = require('discord-graf');
const Log = require('../log').Logger;

const CatchOutputMessage = [
  '**HOW TO CATCH ERRORS WITH PROMISES**',
  '',
  '\`\`\`js',
  'FUNCTION_THAT_RETURNS_PROMISE().then(output => {',
  '  // do something with the output',
  '}).catch(err => {',
  '  // do something with the error',
  '})',
  '\`\`\`'
].join('\n');

class CatchOutputCommand extends Graf.Command {
  constructor(bot) {
    super(bot, {
      name: 'catch promise',
      aliases: ['catch promises', 'catch output', 'error promise', 'error promises'],
      description: 'How to catch the output of a promise',
      memberName: 'catch-promise',
      module: 'general'
    });
  }

  run(msg, args) {
    return Promise.resolve({ plain: CatchOutputMessage });
  }
}

module.exports = CatchOutputCommand;
