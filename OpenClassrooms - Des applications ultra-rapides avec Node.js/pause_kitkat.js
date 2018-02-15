var events = require('events');
var eventEmitter = new events.EventEmitter();
var kitkat = function(){
  console.log ('Fais un break kitkat !');
}
eventEmitter.on('burnout', kitkat);
eventEmitter.emit('burnout');
