var scene = require('./modules/audioscene/audioscene')

scene.addFile('/sounds/car-door-open-close.wav');
console.log(scene.getFileList());
// run with verbose=true for detailed output
scene.listImpulseResponses();