module.exports = (bot, DeleteMessageCommand) => {

  const Hosting = msg => {
    let message = [
      '**Bot Hosting**',
      '*Note: This is a list of hosting, not a backing/support for them. You will need to make your own decision*',

      '*Free*:',
      '**-** __**Openshift**__: <https://www.openshift.com/> . Up to 3 apps 24/7 with different cartridges to suit your needs.',
      '**-** __**Heroku**__: <https://heroku.com>. No CLI or SSH, no file access, might make your app sleep if you reach monthly uptime limit.',

      '*Paid* (but cheap):',
      '**-** __**OVH**__: <https://www.ovh.com/us/vps/>. Full VPS starting at $3.49USD/month, choice of OS, high reliability.',
      '**-** __**Digital Ocean**__: <https://m.do.co/> (or <https://m.do.co/c/a844b9f2c03e> for $10 credit with referral from Gexo)',
      '    Starting at $5/month (USD), you can have your own server with 20GB SSD Disk, and 512MB Memory.',
      '    Use  if you don\'t like the concept of referrals.',
      '**-** __**Time4VPS**__: <https://www.time4vps.eu/>',
      '    Starting at €0.66/month, get 20GB Storage, 512MB Memory, 0.5TB Bandwidth, and Daily/Weekly backups.',
      '    Various Linux OS distributions, IP addons and instant cPanel/WHM licenses.',
      '**-** __**VIRMACH**__: <http://virmach.com/>: Full Windows and Linux Desktop VPS starting at $7USD/month and $10USD/month respectively.',
    ]

    bot.createMessage(msg.channel.id, message.join('\n')).then(DeleteMessageCommand(msg));
  }

  bot.registerCommand('hosting', Hosting);

  bot.registerCommand('gimme', msg => {})
  .registerSubcommand('hosting', Hosting)

}
