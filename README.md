## PunyLogger
A small logger utility can be use to log and prettify the output.

## Installation (not published yet)
Using npm
`$ npm install punylogger`

Using yarn
`$ yarn add punylogger`

From Git repo
`$ git clone https://github.com/Ruzie/PunyLogger.git`

## Options
You can customize punylogger as you want.

When creating a new class this options can be added, by default color logging is disabled.
```
enableColorLogs - [boolean] Enable color logging on terminal
writeOnFile - [boolean] Enable writing logs in soft copy
enableTimestamp - [boolean] Enable/Disable time stamp while logging
logFileName - [string] Log file name which will be store in the disk
infoColor - [string] Change info color
debugColor - [string] Change debug color
warnColor - [string] Change warn color
errorColor - [string] Change error color
successColor - [string] Change success color
okColor - [string] Change ok color
```
All options are optional, without options you can directly create a new class and can use the methods, specified.

### Functions
```
logger.info(...);
logger.debug(...);
logger.warn(...);
logger.error(...);
logger.success(...);
logger.ok(...);
```

## Usage
In TypeScript and ESM
```ts
import Logger from "punylogger";
```
In CommonJS
```js
const Logger = require("punylogger");
```

### Example
```js
const logger = new Logger({ enableColorLogs: true, writeOnFile: true, enableTimestamp: true });
logger.info("hello world");
logger.debug("debug called");
logger.warn("warn!!");
logger.error("an error occurred");
logger.success("ah yes bravo!");
logger.ok("ok...");
```
