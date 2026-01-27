// (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

export interface IResult {
    average_cpu: number;
    average_memory: number;
    bytes_throughput: number;
    request_throughput: number;
}

export interface ITestRunResultData {
    id: number;
    algorithm: string;
    ipsec: string;
    time: number;
    connections: number;
    messageSizeIperf: number;
    bandwidth: number;
    intervals: number;
    iterations: number;
    message_size: number;
    results: IResult;
}
export interface IEnvironmentInfo {
    codeRelease: string;
    cpu: string;
    cpuArchitecture: string;
    cpuClockSpeed: string;
    cpuCores: number;
    nodeSize: string;
    operatingSystem: string;
    resourceName: string;
}

export interface ITestRunResult {
    id: number;
    name: string;
    nameIperf: string;
    description: string;
    descriptionIperf: string;
    start_time: number;
    end_time: number;
    environment_info: IEnvironmentInfo;
    test_runs: ITestRunResultData[];
}
