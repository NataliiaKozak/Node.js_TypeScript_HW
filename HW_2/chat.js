const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('message', (username, msg) => {
  console.log(`${username}: ${msg}`);
});

function sendMessage(username, msg, emitter) {
  emitter.emit('message', username, msg);
}

sendMessage('Michael', 'Hi!', emitter);
sendMessage('Tefani', 'How are you?', emitter);
