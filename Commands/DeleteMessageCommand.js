let commands = {};
let bot = require('../Eris');

module.exports = bot => {
  bot.on('messageDelete', msg => {
    if (msg && commands[msg.id]) {
      let msgToDelete = commands[msg.id];
      bot.deleteMessage(msgToDelete.channel.id, msgToDelete.id);
    }
  });
  return originalMsg => {
    return (msg) => {
      commands[originalMsg.id] = msg;
    }
  }
}
