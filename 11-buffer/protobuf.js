const fs = require('fs');
const protobuf = require('protocol-buffers');


const schemas = protobuf(fs.readFileSync(__dirname + '/test.proto'))

const buffer = 
schemas.Course.encode({
    id: 4,
    name: 'hh',
    lesson: []
})
console.log(
    buffer
);
console.log(
    schemas.Course.decode(buffer)
);
