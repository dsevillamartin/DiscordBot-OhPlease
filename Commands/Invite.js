const Graf = require('discord-graf');
const Log = require('../log').Logger;

const InviteMessage = [
  '**INVITE OH PLEASE TO YOUR SERVER**',
  '<https://discordapp.com/oauth2/authorize?client_id=209744316762030091&scope=bot&permissions=67193856>'
].join('\n');

class InviteCommand extends Graf.Command {
  constructor(bot) {
    super(bot, {
      name: 'invite',
      argsCount: 0,
      description: 'Invite link',
      details: 'Invite Oh Please to your server! Do it! DO IT! **DO IT!!!! I DARE YOU!**',
      memberName: 'invite',
      module: 'general'
    })
  }

  run(msg) {
    return Promise.resolve({ plain: InviteMessage });
  }
}

module.exports = InviteCommand;
