/// <reference types="node" />
import * as Long from 'long';
import * as City128Value from './city128.d';

export as namespace BlingHashes;
declare namespace BlingHashes {
  export function bkdr(str: string): number;
  export function ap(str: string): number;
  export function djb(str: string): number;
  export function js(str: string): number;
  export function rs(str: string): number;
  export function sdbm(str: string): number;
  export function pjw(str: string): number;
  export function elf(str: string): number;

  export function city32(str: string): number;
  export function city64(str: string): Long;
  export function city128(str: string): City128Value;
}
