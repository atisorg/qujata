// (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import { useCallback, useEffect, useState } from 'react';
import { ChartDataMap, IQueryResponse, ITestParamsTLS, ITestParamsIpsec, ITestResponseData } from '../shared/models/quantum.interface';
import { FetchDataStatus, IHttp, useFetch } from '../shared/hooks/useFetch';
import { useFetchSpinner } from '../shared/hooks/useFetchSpinner';
import { APIS } from '../apis';
import { AttSelectOption } from '../shared/components/att-select';
import { useErrorMessage } from './useErrorMessage';

export interface IUseDashboardData {
  testSuiteId: string;
  status: FetchDataStatus;
  handleRunQueryClickTLS: (queryData: ITestParamsTLS) => void;
  handleRunQueryClickIpsec: (queryData: ITestParamsIpsec) => void;
};

interface ITestRequestData {
  experimentName: string;
  experimentNameIperf: string;
  algorithms: string[];
  ipsecAlgorithms: string[];
  time: number[];
  connections: number[];
  messageSizeIperf: number[];
  bandwidth: number[];
  intervals: number[];
  iterationsCount: number[];
  messageSizes: number[];
  description: string;
  descriptionIperf: string;
};

export function useDashboardData(): IUseDashboardData {
  const { post, data, status, error, cancelRequest }: IHttp<IQueryResponse> = useFetch<IQueryResponse>({ url: APIS.analyze });
  const [testSuiteId, setTestSuiteId] = useState<string>('');

  useFetchSpinner(status);
  useEffect(() => cancelRequest, [cancelRequest]);
  useErrorMessage(error);

  useEffect(() => {
    if (status === FetchDataStatus.Success && data) {
        setTestSuiteId(data.test_suite_id);
    }
  }, [data, status]);

  const handleRunQueryClickTLS: (queryData: ITestParamsTLS) => void = useCallback((queryData: ITestParamsTLS): void => {
    let algorithmsValues: string[] = [];
    let iterationsValues: number[] = [];
    let messageSizesValues: number[] = [];

    const algorithms = queryData.algorithms as AttSelectOption[];
    algorithmsValues = algorithms.map((algorithm: AttSelectOption) => algorithm.value);

    const iterations = queryData.iterationsCount as AttSelectOption[];
    iterationsValues = iterations.map((iteration: AttSelectOption) => +iteration.value);

    const messageSizes = queryData.messageSizes as AttSelectOption[];
    messageSizesValues = messageSizes.map((messageSize: AttSelectOption) => +messageSize.value);

    post({
      data: {
        experimentName: queryData.experimentName ?? '',
        algorithms: algorithmsValues,
        iterationsCount: iterationsValues,
        messageSizes: messageSizesValues,
        description: queryData.description ?? ''
      } as ITestRequestData
    });
  }, [post]);

    const handleRunQueryClickIpsec: (queryData: ITestParamsIpsec) => void = useCallback((queryData: ITestParamsIpsec): void => {
    let ipsecAlgorithmsValues: string[] = [];
    let timeValues: number[] = [];
    let connectionsValues: number[] = [];
    let messageSizeIperfValues: number[] = [];
    let bandwidthValues: number[] = [];
    let intervalsValues: number[] = [];

    const ipsecAlgorithms = queryData.ipsecAlgorithms as AttSelectOption[];
    ipsecAlgorithmsValues = ipsecAlgorithms.map((ipsecAlgorithm: AttSelectOption) => ipsecAlgorithm.value);

    const time = queryData.time as AttSelectOption[];
    timeValues = time.map((timex: AttSelectOption) => +timex.value);

    const connections = queryData.connections as AttSelectOption[];
    connectionsValues = connections.map((connection: AttSelectOption) => +connection.value);

    const messageSizeIperf = queryData.messageSizeIperf as AttSelectOption[];
    messageSizeIperfValues = messageSizeIperf.map((messageSizeIperfx: AttSelectOption) => +messageSizeIperfx.value);

    const bandwidth = queryData.bandwidth as AttSelectOption[];
    bandwidthValues = bandwidth.map((bandwidthx: AttSelectOption) => +bandwidthx.value);

    const intervals = queryData.intervals as AttSelectOption[];
    intervalsValues = intervals.map((interval: AttSelectOption) => +interval.value);

    post({
      data: {
        experimentNameIperf: queryData.experimentNameIperf ?? '',
	ipsecAlgorithms: ipsecAlgorithmsValues,
        time: timeValues,
        connections: connectionsValues,
        messageSizeIperf: messageSizeIperfValues,
        bandwidth: bandwidthValues,
        intervals: intervalsValues,
        descriptionIperf: queryData.descriptionIperf ?? ''
      } as ITestRequestData
    });
  }, [post]);

  return {
    handleRunQueryClickTLS,
    handleRunQueryClickIpsec,
    testSuiteId,
    status,
  } as IUseDashboardData;
}
