'use strict';

const chalk = require('chalk');
const EventEmitter = require("events").EventEmitter;
const moment = require('moment');
const util = require('util');
const icons = {
  error: '🔥  ',
  debug: '⚙  ',
  info: '🆗   ',
  message: '💁',
  warn: '⚠️ '
};
let socket;
let logs = [];

/**
 * A Logger to replace `console.log`.
 * It logs to the console, and web
 */
class Logger {

  constructor() {
    this.emitter = new EventEmitter();

    this.debug = this.debug.bind(this);
    this.info = this.info.bind(this);
    this.error = this.error.bind(this);
    this.message = this.message.bind(this);
    this.verbose = this.verbose.bind(this);
  }

  /**
   * Debug it like you would `console.log` it ;)
   * @param {Mixed} ...args - all the arguments
   */
  debug(...args) {
    this.log('debug', ...args);
  }

  /**
   * Log verbose
   * @param {Mixed} ...args - all the arguments
   */
  verbose(...args) {
    this.log('verbose', ...args);
  }

  /**
   * Give me some info, pls
   * @param {Mixed} ...args - all the arguments
   */
  info(...args) {
    this.log('info', ...args);
  }

  /**
   * Warn me please!!
   * @param {Mixed} ...args - all the arguments
   */
  message(...args) {
    this.log('message', ...args);
  }

  /**
   * You gotta error it to me ;((
   * @param {Mixed} ...args - all the arguments
   */
  error(msg) {
    if (typeof msg == 'object' && msg.stack) {
      msg.stack = msg.stack.replace(__dirname, './').replace(new RegExp(TOKEN, 'g'), 'TOKEN_WAS_HERE');
    }
    this.log('error', msg);
  }

  /**
   * Log a message!
   * @param {Mixed} ...args - all the arguments
   */
  message(msg) {
    this.log('message', msg);
  }

  /**
   *
   * @param {String} event - what kind of log
   * @param {cb} cb - callback
   */
  on(event, cb) {
    this.emitter.on(event, cb);
  }

  // inside

  /**
   * Log, with the level and the message
   * @param {String} level - log level, i.e: error
   * @param {Mixed} message - actual message, ya know?
   * @private
   */
   log(level, msg) {
     let args = [...arguments].slice(1);
     let message = util.format(...args).replace(process.env.TOKEN, 'TOKEN');
     let log = `[${moment().format("MM/D/YY HH:mm:ss")}] ${icons[level] || ' '} ${level}: ${message}`;

     if (this.logLevel === 'error' && level !== 'error') return false;
     if (this.logLevel !== 'verbose' && level === 'verbose') return false;

     console.log(log);

     this.emit(log);
   }y

  /**
   * Get all the logs from the latest run
   * @return {Array} logs - Logs, hhm..
   */
  get logs() {
    return logs;
  }

  /**
   * Emit to socket.io and push to the logs
   * @private
   */
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
