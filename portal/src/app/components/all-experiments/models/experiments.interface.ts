// (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import { ITestRunResult, ITestRunResultData } from '../../../shared/models/test-run-result.interface';

export type TestRunSubset = Pick<ITestRunResultData, 'id' | 'algorithm' | 'ipsec' | 'time' | 'connections' | 'messageSizeIperf' | 'bandwidth' | 'intervals' | 'iterations' | 'message_size'>;
export type Experiment = Pick<ITestRunResult, 'id' | 'name' | 'nameIperf' | 'end_time'> & { test_runs: TestRunSubset[] };

export interface ExperimentData {
    id: number;
    name: string;
    nameIperf: string;
    algorithms: string[];
    ipsec: string[];
    time: number[];
    connections: number[];
    messageSizeIperf: number[];
    bandwidth: number[];
    intervals: number[];
    iterations: number[];
    message_sizes: number[];
    end_time: number;
};
