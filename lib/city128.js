'use strict';

const BigNumber = require("big-number");
const Long = require("long");

const MAX_UINT64 = '18446744073709551616';

class City128Value {
  constructor(buffs) {
    this.buffs = buffs;
    this.longs = this.toLongArray();
    this.val = (new BigNumber(this.longs[0].toString()))
      .multiply(MAX_UINT64)
      .plus(this.longs[1].toString());
  }

  toString() {
    return this.val.toString();
  }

  toLongArray() {
    return this.buffs.map(r => new Long(r.readInt32LE(0), r.readInt32LE(4), true));
  }

  toBuffers() {
    return [ Buffer.from(this.buffs[0]), Buffer.from(this.buffs[1]) ];
  }

  toBigNumber() {
    return new BigNumber(this.toString());
  }
}

module.exports = City128Value;
