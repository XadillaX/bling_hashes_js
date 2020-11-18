/// <reference types="node" />
type InitialNumberType = string | number | string[] | BigNumber;

declare class BigNumber {
  constructor(initialNumber: InitialNumberType);

  add(num: InitialNumberType): BigNumber;
  plus(num: InitialNumberType): BigNumber;

  minus(num: InitialNumberType): BigNumber;
  subtract(num: InitialNumberType): BigNumber;

  multiply(num: InitialNumberType): BigNumber;
  mult(num: InitialNumberType): BigNumber;

  divide(num: InitialNumberType): BigNumber;
  div(num: InitialNumberType): BigNumber;

  mod(num: InitialNumberType): BigNumber;

  power(num: InitialNumberType): BigNumber;
  pow(num: InitialNumberType): BigNumber;

  equals(num: InitialNumberType): boolean;
  gt(num: InitialNumberType): boolean;
  gte(num: InitialNumberType): boolean;
  lt(num: InitialNumberType): boolean;
  lte(num: InitialNumberType): boolean;

  isZero(): boolean;
  abs(): BigNumber;

  val(): string;
  toString(): string;
}

export as namespace BigNumber;
declare namespace BigNumber {}
export = BigNumber;
