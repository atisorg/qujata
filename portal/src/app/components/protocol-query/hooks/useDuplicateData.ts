// (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import { useEffect } from 'react';
import { AttSelectOption } from '../../../shared/components/att-select';
import { ExperimentData } from '../../all-experiments/models/experiments.interface';

export type DuplicateData = {
  data: ExperimentData | undefined,
  setDuplicateData: (data?: ExperimentData) => void,
  setExperimentName: (name: string) => void,
  setExperimentNameIperf: (name: string) => void,
  setAlgorithms: (options: AttSelectOption[]) => void,
  setIpsec: (options: AttSelectOption[]) => void,
  setTime: (options: AttSelectOption[]) => void,
  setConnections: (options: AttSelectOption[]) => void,
  setMessageSizeIperf: (options: AttSelectOption[]) => void,
  setBandwidth: (options: AttSelectOption[]) => void,
  setIntervals: (options: AttSelectOption[]) => void,
  setIterationsCount: (options: AttSelectOption[]) => void,
  setMessageSize: (options: AttSelectOption[]) => void
}

export const useDuplicateData = (duplicate: DuplicateData) => {
  useEffect(() => {
    if (duplicate.data) {
      const duplicateData = duplicate.data;
      if (duplicateData.name) {
        duplicate.setExperimentName(duplicateData.name);
      }
      if (duplicateData.algorithms) {
        const algorithmOptions = duplicateData.algorithms.map((algorithm: string) => {
          return { label: algorithm, value: algorithm } as AttSelectOption;
        });
        duplicate.setAlgorithms(algorithmOptions);
      }
      if (duplicateData.ipsec) {
        const ipsecOptions = duplicateData.ipsec.map((ipsec: string) => {
          return { label: ipsec, value: ipsec } as AttSelectOption;
        });
        duplicate.setIpsec(ipsecOptions);
      }
      if (duplicateData.time) {
        const timeOptions = duplicateData.time.map((time: number) => {
          return { label: time.toString(), value: time.toString() } as AttSelectOption;
        });
        duplicate.setTime(timeOptions);
      }
      if (duplicateData.connections) {
        const connectionsOptions = duplicateData.connections.map((connections: number) => {
          return { label: connections.toString(), value: connections.toString() } as AttSelectOption;
        });
        duplicate.setConnections(connectionsOptions);
      }
      if (duplicateData.messageSizeIperf) {
        const messageSizeIperfOptions = duplicateData.messageSizeIperf.map((messageSizeIperf: number) => {
          return { label: messageSizeIperf.toString(), value: messageSizeIperf.toString() } as AttSelectOption;
        });
        duplicate.setMessageSizeIperf(messageSizeIperfOptions);
      }
      if (duplicateData.bandwidth) {
        const bandwidthOptions = duplicateData.bandwidth.map((bandwidth: number) => {
          return { label: bandwidth.toString(), value: bandwidth.toString() } as AttSelectOption;
        });
        duplicate.setBandwidth(bandwidthOptions);
      }
      if (duplicateData.intervals) {
        const intervalsOptions = duplicateData.intervals.map((intervals: number) => {
          return { label: intervals.toString(), value: intervals.toString() } as AttSelectOption;
        });
        duplicate.setIntervals(intervalsOptions);
      }
      if (duplicateData.iterations) {
        const iterationsOptions = duplicateData.iterations.map((iteration: number) => {
          return { label: iteration.toString(), value: iteration.toString() } as AttSelectOption;
        });
        duplicate.setIterationsCount(iterationsOptions);
      }
      if (duplicateData.message_sizes) {
        const messageSizeOptions = duplicateData.message_sizes.map((messageSize: number) => {
          return { label: messageSize.toString(), value: messageSize.toString() } as AttSelectOption;
        });
        duplicate.setMessageSize(messageSizeOptions);
      }
      duplicate.setDuplicateData(undefined);
    }
  }, [duplicate]);
};
