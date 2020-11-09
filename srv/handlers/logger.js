/* eslint-disable no-console */

const Env = require('./cf/env');
const { Console } = require('console');

const DEFAULT_LOG_LEVEL = 'info';

const LOG_LEVEL = {
    error: {
        name: 'ERROR',
        value: 0
    },
    info: {
        name: 'INFO ',
        value: 1
    },
    debug: {
        name: 'DEBUG',
        value: 2
    }
};


class Logger extends Console {

    constructor(component, collector) {
        super(process.stdout, process.stderr);
        this._component = component;
        this._collector = collector;
        let configuredLogLevel = Env.getValueOrDefault('LOG_LEVEL', DEFAULT_LOG_LEVEL);
        if (process.env.DEBUG) {
            configuredLogLevel = 'debug';
        }
        const validLogLevel = LOG_LEVEL[configuredLogLevel];
        if (validLogLevel) {
            this._logLevel = validLogLevel.value;
        } else {
            this._logLevel = LOG_LEVEL.info.value;
            this.error(`LOG_LEVEL ${configuredLogLevel} that set is in the environment is invalid. Please use ${Object.getOwnPropertyNames(LOG_LEVEL)}`);
        }
        this.LOG_LEVEL = LOG_LEVEL;
    }

    hasLevel(logLevel) {
        if (typeof logLevel === 'string') {
            logLevel = this.LOG_LEVEL[logLevel];
        }
        return (this._logLevel >= logLevel.value);
    }

    info(message, ...args) {
        this._log(message, LOG_LEVEL.info, ...args);
    }


    debug(message, ...args) {
        this._log(message, LOG_LEVEL.debug, ...args);
        const logMemory = process.env.MTX_LOG_MEMORY ? process.env.MTX_LOG_MEMORY.toString().toLowerCase(): "";
        if (logMemory === "true") {
            this._log(JSON.stringify(process.memoryUsage()), LOG_LEVEL.debug);
        }
    }


    log(message, ...args) {
        this._log(message, LOG_LEVEL.debug, ...args);
    }


    _log(message, severity, ...args) {
        if (this._logLevel >= severity.value) {
            const formattedMessage = this._formatMessage(message, severity);
            console.log(formattedMessage, ...args);
            if (this._collector) {
                this._collector.log(formattedMessage, ...args);
            }
        }
    }


    error(error, ...args) {
        let errorString = error;

        if (error.message) {
            errorString = error.message;
        }
        if (error.stack) {
            errorString += '\nStack: \n ' + error.stack;
        }
        const formattedMessage = this._formatMessage(errorString, LOG_LEVEL.error);
        console.error(formattedMessage, ...args);
        if (this._collector) {
            this._collector.log(formattedMessage, ...args);
        }
    }


    _formatMessage(message, severity) {
        message = '[' + severity.name + '][' + this._component + '] ' + message;

        return message;
    }

    set logCollector(collector) {
        this._collector = collector;
    }

    set logLevel(level) {
        this._logLevel = level.value;
    }

    static get LOG_LEVEL() {
        return LOG_LEVEL;
    }
}

module.exports = Logger;

/* eslint-enable no-console */
