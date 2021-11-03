const buf1 = Buffer.from([10, 10]);
const buf2 = Buffer.from([10, 1,2,3]);
console.log(buf1);
console.log(buf2);

buf2.writeInt8(12, 1);
console.log(buf2);
buf2.writeInt16LE(512, 1);
console.log(buf2);