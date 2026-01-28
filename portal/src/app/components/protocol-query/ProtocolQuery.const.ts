// (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import { AttSelectOption } from '../../shared/components/att-select';
import { AlgorithmsPerTypeMapType, AlgorithmTypeEnum } from './ProtocolQuery.model';

export const AlgorithmTypeOptions: AttSelectOption[] = [
  {
    label: AlgorithmTypeEnum.BIKE,
    value: AlgorithmTypeEnum.BIKE,
  },
  {
    label: AlgorithmTypeEnum.MLKEM,
    value: AlgorithmTypeEnum.MLKEM,
  },
  {
    label: AlgorithmTypeEnum.FrodoKEM,
    value: AlgorithmTypeEnum.FrodoKEM,
  },
];

export const BikeAlgorithms: AttSelectOption[] = ['bikel1', 'bikel3'].map((algo: string) => ({ label: algo, value: algo }));

const MLKEMAlgorithms: AttSelectOption[] = ['mlkem512', 'mlkem768', 'mlkem1024']
  .map((algo: string) => ({ label: algo, value: algo }));

const FrodoKEMAlgorithms: AttSelectOption[] = ['frodo640aes', 'frodo640shake', 'frodo976aes',
  'frodo976shake', 'frodo1344aes', 'frodo1344shake'].map((algo: string) => ({ label: algo, value: algo }));

export const PQAlgorithms: AttSelectOption[] = [...BikeAlgorithms, ...MLKEMAlgorithms];
export const ClassicAlgorithms: AttSelectOption[] = ['prime256v1', 'secp384r1'].map((algo: string) => ({ label: algo, value: algo }));
export const HybridAlgorithms: AttSelectOption[] = ['p256_mlkem512', 'p384_mlkem768', 'X25519MLKEM768'].map((algo: string) => ({ label: algo, value: algo }));
export const AlgorithmTitles: AttSelectOption[] = ['─────────── Classic ─────────────', '─────────── Hybrid ─────────────', '─────────── PQ ──────────────']
  .map((algo: string) => ({ label: algo, value: algo, isDisabled: true }));

export const AllAlgorithms: AttSelectOption[] = [
  AlgorithmTitles[0],
  ...ClassicAlgorithms,
  AlgorithmTitles[1],
  ...HybridAlgorithms,
  AlgorithmTitles[2],
  ...PQAlgorithms
];

export const AlgorithmsPerTypeMap: AlgorithmsPerTypeMapType = {
  [AlgorithmTypeEnum.BIKE]: BikeAlgorithms,
  [AlgorithmTypeEnum.MLKEM]: MLKEMAlgorithms,
  [AlgorithmTypeEnum.FrodoKEM]: FrodoKEMAlgorithms
};
