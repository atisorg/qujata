// (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import { ITestRunResultData } from "../../../../../../../../shared/models/test-run-result.interface";

export const MOCK_DATA_TO_SORT_BY_ALGORITHM: ITestRunResultData[] = [
  {
    id: 1,
    algorithm: "Algorithm1",
    ipsec: "Algorithm1", 
    time: 5,
    connections: 1,
    messageSizeIperf: 16,
    bandwidth: 1000,
    intervals: 0.5,
    iterations: 1000,
    message_size: 1024,
    results:  
    { 
      average_cpu: 25.5, 
      average_memory: 512,
      bytes_throughput: 11,
      request_throughput: 21 
    } 
  },
  {
    id: 2,
    algorithm: "Algorithm2", 
    ipsec: "Algorithm2",
    time: 10,
    connections: 3,
    messageSizeIperf: 1024,
    bandwidth: 100000,
    intervals: 1,
    iterations: 100,
    message_size: 2048,
    results:  
    { 
      average_cpu: 25, 
      average_memory: 52,
      bytes_throughput: 11,
      request_throughput: 21 
    } 
  },
  {
    id: 3,
    algorithm: "Algorithm1", 
    ipsec: "Algorithm1",
    time: 20,
    connections: 5,
    messageSizeIperf: 1024,
    bandwidth: 1000000,
    intervals: 2,
    iterations: 20000,
    message_size: 1024,
    results:  
    { 
      average_cpu: 25, 
      average_memory: 52,
      bytes_throughput: 11,
      request_throughput: 21 
    } 
  }
];

export const MOCK_DATA_TO_SORT_BY_ITERATION: ITestRunResultData[] = [ 
  {
    id: 1,
    algorithm: "Algorithm1", 
    ipsec: "Algorithm1",
    time: 5,
    connections: 1,
    messageSizeIperf: 16,
    bandwidth: 1000,
    intervals: 0.5,
    iterations: 1000,
    message_size: 1024,
    results:  
    { 
      average_cpu: 25.5, 
      average_memory: 512,
      bytes_throughput: 11,
      request_throughput: 21 
    } 
  },
  { 
    id: 2,
    algorithm: "Algorithm1", 
    ipsec: "Algorithm1",
    time: 5,
    connections: 1,
    messageSizeIperf: 16,
    bandwidth: 1000,
    intervals: 0.5,
    iterations: 100,
    message_size: 512,
    results:  
    { 
      average_cpu: 25, 
      average_memory: 52,
      bytes_throughput: 11,
      request_throughput: 21
    } 
  },
  { 
    id: 3,
    algorithm: "Algorithm1",
    ipsec: "Algorithm1",
    time: 10,
    connections: 3,
    messageSizeIperf: 1024,
    bandwidth: 100000,
    intervals: 1, 
    iterations: 20000,
    message_size: 1024,
    results:  
    { 
      average_cpu: 25, 
      average_memory: 52,
      bytes_throughput: 11,
      request_throughput: 21 
    } 
  }
];

export const MOCK_DATA_FOR_CHART_UTILS: ITestRunResultData[] = [
  {
    id: 1,
    algorithm: "Algorithm1", 
    ipsec: "Algorithm1",
    time: 5,
    connections: 1,
    messageSizeIperf: 16,
    bandwidth: 1000,
    intervals: 0.5,
    iterations: 1000,
    message_size: 1024,
    results:  
    { 
      average_cpu: 25.5, 
      average_memory: 512,
      bytes_throughput: 11,
      request_throughput: 21 
  } 
  },
  {
    id: 2,
    algorithm: "Algorithm2", 
    ipsec: "Algorithm2",
    time: 10,
    connections: 3,
    messageSizeIperf: 1024,
    bandwidth: 100000,
    intervals: 1,
    iterations: 10,
    message_size: 1024,
    results:  
    { 
      average_cpu: 25, 
      average_memory: 52,
      bytes_throughput: 11,
      request_throughput: 21 
    } 
  },
  {
    id: 3,
    algorithm: "Algorithm1", 
    ipsec: "Algorithm1",
    time: 20,
    connections: 5,
    messageSizeIperf: 1024,
    bandwidth: 1000000,
    intervals: 2,
    iterations: 20000,
    message_size: 2048,
    results:  
    { 
      average_cpu: 25, 
      average_memory: 52,
      bytes_throughput: 11,
      request_throughput: 21
    } 
  }
];
