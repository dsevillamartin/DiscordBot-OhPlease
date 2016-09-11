const Graf = require('discord-graf');
const Log = require('../log').Logger;

const CodeblocksMessage = [
  '**HOW TO USE CODEBLOCKS:**',
  '',
  '\\`\\`\\`js',
  'const Discord = require(\'discord.js\');',
  '\\`\\`\\`',
  'will transform into',
  '',
  '\`\`\`js',
  'const Discord = require(\`discord.js\`);',
  '\`\`\`'
].join('\n');

class CodeblocksCommand extends Graf.Command {
  constructor(bot) {
    super(bot, {
      name: 'codeblocks',
      aliases: ['use codeblocks', 'use code blocks', 'code blocks'],
      description: 'How to use codeblocks',
      memberName: 'codeblocks',
      module: 'general'
    });
  }

  run(msg, args) {
    return Promise.resolve({ plain: CodeblocksMessage });
  }
}

module.exports = CodeblocksCommand;
