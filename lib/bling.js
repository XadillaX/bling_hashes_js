'use strict';

const Long = require('long');

const binding = require('../dist/export');
const City128Value = require('./city128');

const raw = {
  newUInt32: binding.cwrap('new_uint32', 'number', []),
  newUInt64: binding.cwrap('new_uint64', 'number', []),
  newUInt128: binding.cwrap('new_uint128', 'number', []),

  calcHash: binding.cwrap('CalcHash', 'null', [ 'string', 'string', 'number' ]),
  calcCityHash32: binding.cwrap('CalcCityHash32', 'null', [ 'string', 'number' ]),
  calcCityHash64: binding.cwrap('CalcCityHash64', 'null', [ 'string', 'number' ]),
  calcCityHash128: binding.cwrap('CalcCityHash128', 'null', [ 'string', 'number' ]),
};

function calcHash(type, str) {
  const ptr = raw.newUInt32();
  raw.calcHash(type, str, ptr);
  const buff = Buffer.from(binding.HEAPU8.subarray(ptr, ptr + 4));
  binding._free(ptr);

  return buff.readUInt32LE();
}

exports.bkdr = function(str) {
  return calcHash('BKDR', str);
};

exports.ap = function(str) {
  return calcHash('AP', str);
};

exports.djb = function(str) {
  return calcHash('DJB', str);
};

exports.js = function(str) {
  return calcHash('JS', str);
};

exports.rs = function(str) {
  return calcHash('RS', str);
};

exports.sdbm = function(str) {
  return calcHash('SDBM', str);
};

exports.pjw = function(str) {
  return calcHash('PJW', str);
};

exports.elf = function(str) {
  return calcHash('ELF', str);
};

exports.city32 = function(str) {
  const ptr = raw.newUInt32();
  raw.calcCityHash32(str, ptr);
  const buff = Buffer.from(binding.HEAPU8.subarray(ptr, ptr + 4));
  binding._free(ptr);

  return buff.readUInt32LE();
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
