const fs = require('fs');

function logMessage(message) {
  fs.appendFile('log.txt', message + '\n', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Сообщение успешно записано');
  });
}

module.exports = { logMessage };
