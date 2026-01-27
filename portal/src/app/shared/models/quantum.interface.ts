// (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import { SelectOptionType } from '../../components/protocol-query';
import { AttSelectOption } from '../components/att-select/AttSelect.model';

export type ChartDataMap = Map<AttSelectOption, ITestResponseData | undefined>;

export interface ITestParamsTLS {
  experimentName: string;
  algorithms: SelectOptionType;
  iterationsCount: SelectOptionType;
  messageSizes: SelectOptionType;
  description: string;
}

export interface ITestParamsIpsec {
  experimentNameIperf: string;
  ipsecAlgorithms: SelectOptionType;
  time: SelectOptionType;
  connections: SelectOptionType;
  messageSizeIperf: SelectOptionType;
  bandwidth: SelectOptionType;
  intervals: SelectOptionType;
  descriptionIperf: string;
}

export interface ITestResponse {
  data: ITestResponseData;
}

export interface IQueryResponse {
  test_suite_id: string;
  from: string;
  to: string;
}

export interface ITestResponseData {
  totalTime: number[];
  connectTime: number[];
  downloadSpeed: number[];
  serverMemory: number[];
  serverCpu: number[];
  clientMemory: number[];
  clientCpu: number[];
}

export interface ITimeDataItem {
  min: string;
  max: string;
  avg: string;
}

export interface ITimeData {
  totalTime: ITimeDataItem;
  connectTime: ITimeDataItem;
  downloadSpeed: ITimeDataItem;
}
