// (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import { Experiment, ExperimentData, TestRunSubset } from '../models/experiments.interface';

export function parseExperimentsData(test_suites: Experiment[]) {
  const experimentsData: ExperimentData[] = [];

  test_suites.forEach((experiment: Experiment) => {
    const algorithms = new Set<string>();
    const ipsec = new Set<string>();
    const time = new Set<number>();
    const connections = new Set<number>();
    const messageSizeIperf = new Set<number>();
    const bandwidth = new Set<number>();
    const intervals = new Set<number>();
    const iterations = new Set<number>();
    const message_sizes = new Set<number>();
    experiment.test_runs?.forEach((testRun: TestRunSubset) => {
      algorithms.add(testRun.algorithm);
      ipsec.add(testRun.ipsec);
      time.add(testRun.time);
      connections.add(testRun.connections);
      messageSizeIperf.add(testRun.messageSizeIperf);
      bandwidth.add(testRun.bandwidth);
      intervals.add(testRun.intervals);
      iterations.add(testRun.iterations);
      message_sizes.add(testRun.message_size);
    });

    const sortedAlgorithms = Array.from(algorithms).sort();
    const sortedIpsec = Array.from(ipsec).sort();
    const sortedTime = Array.from(time).sort();
    const sortedConnections = Array.from(connections).sort();
    const sortedMessageSizeIperf = Array.from(messageSizeIperf).sort();
    const sortedBandwidth = Array.from(bandwidth).sort();
    const sortedIntervals = Array.from(intervals).sort();
    const sortedIterations = Array.from(iterations).sort((a, b) => a - b);
    const sortedMessageSizes = Array.from(message_sizes).sort((a, b) => a - b);

    experimentsData.push({
      id: experiment.id,
      name: experiment.name,
      nameIperf: experiment.nameIperf,
      algorithms: sortedAlgorithms,
      ipsec: sortedIpsec,
      time: sortedTime,
      connections: sortedConnections,
      messageSizeIperf: sortedMessageSizeIperf,
      bandwidth: sortedBandwidth,
      intervals: sortedIntervals,
      iterations: sortedIterations,
      message_sizes: sortedMessageSizes,
      end_time: experiment.end_time
    });
  });

  return experimentsData;
}
