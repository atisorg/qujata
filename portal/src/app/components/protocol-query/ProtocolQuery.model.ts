// (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import { AttSelectOption } from '../../shared/components/att-select';

export enum AlgorithmTypeEnum {
  BIKE = 'BIKE',
  MLKEM = 'MLKEM',
  FrodoKEM = 'FrodoKEM'
}

export type AlgorithmsPerTypeMapType = { [key in AlgorithmTypeEnum]: AttSelectOption[] };
