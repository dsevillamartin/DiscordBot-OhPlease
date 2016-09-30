'use strict';

const chalk = require('chalk');
const EventEmitter = require("events").EventEmitter;
const moment = require('moment');
const util = require('util')
const icons = {
  error: '🔥   ',
  debug: '⚙  ',
  info: '🆗   ',
  message: '💁',
  warn: '⚠ '
};
let socket;
let logs = [];

class Logger {

  constructor(logLevel) {
    this.emitter = new EventEmitter();
    this.logLevel = 'debug';

    this.debug = this.debug.bind(this);
    this.info = this.info.bind(this);
    this.error = this.error.bind(this);
    this.message = this.message.bind(this);
    this.verbose = this.verbose.bind(this);
    this.warn = this.warn.bind(this);
  }

  // methods
  debug(msg) {
    this.log('debug', msg);
  }
  info(msg) {
    this.log('info', msg);
  }
  error(msg) {
    if (typeof msg == 'object' && msg.stack) {
      msg.stack = msg.stack.replace(process.cwd(), '.');
    }
    this.log('error', msg);
  }
  message(msg) {
    this.log('message', msg);
  }
  verbose(msg) {
    this.log('verbose', msg);
  }
  warn(msg) {
    this.log('warn', msg);
  }
  on(event, cb) {
    this.emitter.on(event, cb);
  }

  // inside

  log(level, msg) {
    let args = [...arguments].slice(1);
    let message = util.format(...args).replace(process.env.TOKEN, 'TOKEN');
    let log = `[${moment().format("MM/D/YY HH:mm:ss")}] ${icons[level] || ' '} ${level}: ${message}`;

    if (this.logLevel === 'error' && level !== 'error') return false;
    if (this.logLevel !== 'verbose' && level === 'verbose') return false;

    console.log(log);

    this.emit(log);
  }

  get logs() {
    return logs;
  }

  emit(log) {
    logs.push(log.replace(/(\[)\w+(m)/g, ''));
    if (!socket) return false;
    socket.emit('log', log.replace(/(\[)\w+(m)/g, ''));
  }
}

module.exports = {
  Logger: new Logger(),
  Socket: io => {
    socket = exports.Socket = module.exports.Socket = io;
    return socket;
  }
};
