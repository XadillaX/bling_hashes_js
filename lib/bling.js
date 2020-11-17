'use strict';

const Long = require('long');

const binding = require('../dist/export');
const City128Value = require('./city128');

const raw = {
  newUInt64: binding.cwrap('new_uint64', 'number', []),
  newUInt128: binding.cwrap('new_uint128', 'number', []),

  calcHash: binding.cwrap('CalcHash', 'number', [ 'string', 'string' ]),
  calcCityHash32: binding.cwrap('CalcCityHash32', 'number', [ 'string' ]),
  calcCityHash64: binding.cwrap('CalcCityHash64', 'null', [ 'string', 'number' ]),
  calcCityHash128: binding.cwrap('CalcCityHash128', 'null', [ 'string', 'number' ]),
};

exports.bkdr = function(str) {
  return raw.calcHash('BKDR', str);
};

exports.ap = function(str) {
  return raw.calcHash('AP', str);
};

exports.djb = function(str) {
  return raw.calcHash('DJB', str);
};

exports.js = function(str) {
  return raw.calcHash('JS', str);
};

exports.rs = function(str) {
  return raw.calcHash('RS', str);
};

exports.sdbm = function(str) {
  return raw.calcHash('SDBM', str);
};

exports.pjw = function(str) {
  return raw.calcHash('PJW', str);
};

exports.elf = function(str) {
  return raw.calcHash('ELF', str);
};

exports.city32 = function(str) {
  return raw.calcCityHash32(str);
};

exports.city64 = function(str) {
  const ptr = raw.newUInt64();
  raw.calcCityHash64(str, ptr);
  const buff = Buffer.from(binding.HEAPU8.subarray(ptr, ptr + 8));
  binding._free(ptr);

  const int64 = new Long(buff.readInt32LE(0), buff.readInt32LE(4), true);
  return int64;
};

exports.city128 = function(str) {
  const ptr = raw.newUInt128();
  raw.calcCityHash128(str, ptr);
  const buffs = [
    Buffer.from(binding.HEAPU8.subarray(ptr, ptr + 8)),
    Buffer.from(binding.HEAPU8.subarray(ptr + 8, ptr + 16)),
  ];
  binding._free(ptr);

  return new City128Value(buffs);
};
