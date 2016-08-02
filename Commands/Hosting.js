module.exports = (bot, DeleteMessageCommand) => {

  const Hosting = msg => {
    let freeHosting = [{
      name: 'Openshift',
      url: 'https://www.openshift.com/',
      description: 'Openshift lets you have up to 3 free apps running 24/7 per account, and has different cartridges to suit your needs.'
    }, {
      name: 'Heroku',
      url: 'https://heroku.com',
      description: 'With a free account, Heroku makes your web apps sleep, but you can have a worker app (just process, no interface) running 24/7 until you reach the time limit for every month.'
    }];
    let paidHosting = [{
      name: 'OVH',
      url: 'https://www.ovh.com/us/vps/',
      description: 'Your own VPS starting at $3.49/month, with installation of additional storage and resources in a few clicks. Ubuntu Server or Debian are recommended for the OS'
    }, {
      name: 'Digital Ocean',
      url: 'https://m.do.co/c/a844b9f2c03e',
      description: 'Starting at $5/month (USD), you can have your own server with 20GB SSD Disk, and 512MB Memory in 1 minute. Every project is a droplet. Ubuntu is recommended for the OS'
    }, {
      name: 'Time4VPS',
      url: 'https://www.time4vps.eu/',
      description: 'Starting at €0.66/month, get 20GB Storage, 512MB Memory, 0.5TB Bandwidth, and Daily/Weekly backups.  Various Linux OS distributions, IP addons and instant cPanel/WHM licenses. 30-Day Money Back Guarantee.',
      warning: 'MAY NOT PROVIDE DDOS/HACKING PROTECTION'
    }];
    let message = [
      '_**FREE HOSTING**_', ''
    ];
    freeHosting.forEach(elem => {
      let hostingMsg = [
        `• **${elem.name}**`,
        `  - <${elem.url}>`,
        `  - ${elem.description}`
      ].join('\n')
      message.push(hostingMsg);
    });
    message = message.concat(['', '_**PAID HOSTING**_', '']);
    paidHosting.forEach(elem => {
      let hostingMsg = [
        `• **${elem.name}** ${elem.warning ? `_(${elem.warning})_` : ''}`,
        `  - <${elem.url}>`,
        `  - ${elem.description}`
      ].join('\n')
      message.push(hostingMsg);
    });

    bot.createMessage(msg.channel.id, message.join('\n')).then(DeleteMessageCommand(msg));
  }

  bot.registerCommand('hosting', Hosting);

  bot.registerCommand('gimme', msg => {})
  .registerSubcommand('hosting', Hosting)

}
