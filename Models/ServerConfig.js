const Log = require('../log').Logger;
const ServerConf = require('./index').ServerConf;
const server_conf = new Map();
const default_conf = {
  prefix: 'oh please',
  commands: 'all'
};

exports.init = bot => {
  ServerConf.Find().then(confs => {
    for (const guild of confs) server_conf.set(guild.server_id, guild);
    for (const guild of bot.guilds) {
      if (!server_conf.has(guild.id)) {
        let new_server_conf = new ServerConf(default_conf);
        new_server_conf.id = guild.id;
        new_server_conf.save().then(conf => {
          server_conf.set(guild.id, conf);
        }).catch(Log.error);
      }
    }
  }).catch(Log.error);
}

exports.Get = guild_id => {
  if (server_conf.has(guild_id)) {
    let serverconf = server_conf.get(guild_id);
    const conf = {};
    if (serverconf) {
      for (let key in serverconf) {
        if (serverconf[key]) {
          conf[key] = serverconf[key];
        } else {
          conf[key] = default_conf[key];
        }
      }
      return conf;
    }
  } else return default_conf;
}

exports.has = guild_id => {
  return server_conf.has(guild_id);
};

exports.Add = guild => {
  return new Promise((resolve, reject) => {
    if (server_conf.has(guild.id)) return reject(`Server ${guild.name} is already in the configuration`);
    let new_conf  = new ServerConf(default_conf);
    new_conf.id = guild.id;
    return new_conf.save().then(conf => {
      return server_conf.set(guild.id, conf);
    });
  });
}

exports.Remove = guild => {
  return new Promise((resolve, reject) => {
    if (!server_conf.has(guild.id)) return reject(`Server ${guild.name} doesn\'t exist in the configuration`);
    ServerConf.Delete(guild.id).then(() => {
      server_conf.delete(guild.id);
      resolve();
    }).catch(reject);
  });
}
