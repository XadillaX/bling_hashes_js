/// <reference types="node" />
import * as BigNumber from './big-number.d';
import * as Long from 'long';

declare class City128Value {
  constructor(buffs: Buffer[]);

  public toString(): string;
  public toBigNumber(): BigNumber;
  public toLongArray(): Long[];
  public toBuffers(): Buffer[];

  public buffs: Buffer[];
  public longs: Long[];
  public val: BigNumber;
}

export as namespace City128Value;
declare namespace City128Value {}
export = City128Value;
