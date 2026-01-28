// (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import { renderHook } from '@testing-library/react-hooks';
import { useDuplicateData, DuplicateData } from './useDuplicateData';
import { AttSelectOption } from '../../../shared/components/att-select';
import { ExperimentData } from '../../all-experiments/models/experiments.interface';

describe('useDuplicateData', () => {
  it('should set experiment name, algorithms, and iterations count when duplicate data is provided', () => {
    const setExperimentName = jest.fn();
    const setExperimentNameIperf = jest.fn();
    const setAlgorithms = jest.fn();
    const setIpsec = jest.fn();
    const setTime = jest.fn();
    const setConnections = jest.fn();
    const setMessageSizeIperf = jest.fn();
    const setBandwidth = jest.fn();
    const setIntervals = jest.fn();
    const setIterationsCount = jest.fn();
    const setMessageSize = jest.fn();
    const setDuplicateData = jest.fn();

    const duplicateData: ExperimentData = {
      id: 1111,
      name: 'test',
      nameIperf: 'test',
      algorithms: ['algorithm1', 'algorithm2'],
      ipsec: ['algorithm1'],
      time: [5, 10, 20],
      connections: [1, 3, 5],
      messageSizeIperf: [16, 1024, 65507],
      bandwidth: [1000, 100000, 1000000],
      intervals: [0.5, 1, 2],
      iterations: [1, 2, 3],
      message_sizes: [4, 5, 6],
      end_time: 1705240065192,
    };

    const { rerender } = renderHook((props: DuplicateData) => useDuplicateData(props), {
      initialProps: {
        data: undefined,
        setDuplicateData,
        setExperimentName,
        setExperimentNameIperf,
        setAlgorithms,
        setIpsec,
        setTime,
        setConnections,
        setMessageSizeIperf,
        setBandwidth,
        setIntervals,
        setIterationsCount,
        setMessageSize,
      } as DuplicateData
    });

    expect(setExperimentName).not.toHaveBeenCalled();
    expect(setExperimentNameIperf).not.toHaveBeenCalled();
    expect(setAlgorithms).not.toHaveBeenCalled();
    expect(setIpsec).not.toHaveBeenCalled();
    expect(setTime).not.toHaveBeenCalled();
    expect(setConnections).not.toHaveBeenCalled();
    expect(setMessageSizeIperf).not.toHaveBeenCalled();
    expect(setBandwidth).not.toHaveBeenCalled();
    expect(setIntervals).not.toHaveBeenCalled();
    expect(setIterationsCount).not.toHaveBeenCalled();
    expect(setDuplicateData).not.toHaveBeenCalled();

    rerender({
      data: duplicateData,
      setDuplicateData,
      setExperimentName,
      setExperimentNameIperf,
      setAlgorithms,
      setIpsec,
      setTime,
      setConnections,
      setMessageSizeIperf,
      setBandwidth,
      setIntervals,
      setIterationsCount,
      setMessageSize
    });

    expect(setExperimentName).toHaveBeenCalledWith(duplicateData.name);
    expect(setExperimentNameIperf).toHaveBeenCalledWith(duplicateData.nameIperf);
    expect(setAlgorithms).toHaveBeenCalledWith(duplicateData.algorithms.map(algorithm => ({ label: algorithm, value: algorithm } as AttSelectOption)));
    expect(setIpsec).toHaveBeenCalledWith(duplicateData.ipsec.map(ipsec => ({ label: ipsec, value: ipsec } as AttSelectOption)));
    expect(setTime).toHaveBeenCalledWith(duplicateData.time.map(time => ({ label: time.toString(), value: time.toString() } as AttSelectOption)));
    expect(setConnections).toHaveBeenCalledWith(duplicateData.connections.map(connections => ({ label: connections.toString(), value: connections.toString() } as AttSelectOption)));
    expect(setMessageSizeIperf).toHaveBeenCalledWith(duplicateData.messageSizeIperf.map(messageSizeIperf => ({ label: messageSizeIperf.toString(), value: messageSizeIperf.toString() } as AttSelectOption)));
    expect(setBandwidth).toHaveBeenCalledWith(duplicateData.bandwidth.map(bandwidth => ({ label: bandwidth.toString(), value: bandwidth.toString() } as AttSelectOption)));
    expect(setIntervals).toHaveBeenCalledWith(duplicateData.intervals.map(intervals => ({ label: intervals.toString(), value: intervals.toString() } as AttSelectOption)));
    expect(setIterationsCount).toHaveBeenCalledWith(duplicateData.iterations.map(iteration => ({ label: iteration.toString(), value: iteration.toString() } as AttSelectOption)));
    expect(setMessageSize).toHaveBeenCalledWith(duplicateData.message_sizes.map(messageSize => ({ label: messageSize.toString(), value: messageSize.toString() } as AttSelectOption)));
    expect(setDuplicateData).toHaveBeenCalledWith(undefined);
  });
});
