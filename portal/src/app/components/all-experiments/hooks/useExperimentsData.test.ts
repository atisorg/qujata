// (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import { renderHook } from '@testing-library/react';
import { useFetch } from '../../../shared/hooks/useFetch';
import { Experiment } from '../models/experiments.interface';
import { useExperimentsData } from './useExperimentsData';

jest.mock('../../../shared/hooks/useFetch', () => ({
  useFetch: jest.fn(),
}));
jest.mock('../../../shared/hooks/useFetchSpinner');
jest.mock('../../../hooks/useErrorMessage');
  
describe('useExperimentsData', () => {
  test('Should be in Success mode', () => {
    const allExperimentsMockData: Experiment[] = [
      {
        id: 17,
        name: "Experiment 3",
        nameIperf: "Experiment 3",
        end_time: 1705389926549,
        test_runs: [
          {
            id: 366,
            algorithm: "prime256v1",
            ipsec: "mlkem512",
            time: 5,
            connections: 1,
            messageSizeIperf: 16,
            bandwidth: 1000,
            intervals: 0.5,
            iterations: 500,
            message_size: 1024
          },
          {
            id: 367,
            algorithm: "bikel3",
            ipsec: "mlkem768",
            time: 10,
            connections: 3,
            messageSizeIperf: 1024,
            bandwidth: 100000,
            intervals: 1,
            iterations: 1000,
            message_size: 512
          },
          {
            id: 368,
            algorithm: "p256_mlkem512",
            ipsec: "mlkem1024",
            time: 20,
            connections: 5,
            messageSizeIperf: 65507,
            bandwidth: 1000000,
            intervals: 2,
            iterations: 10000,
            message_size: 1024
          },
          {
            id: 369,
            algorithm: "prime256v1",
            ipsec: "mlkem512",
            time: 10,
            connections: 3,
            messageSizeIperf: 1024,
            bandwidth: 100000,
            intervals: 1,
            iterations: 5000,
            message_size: 512
          }
        ]
      },
      {
        id: 18,
        name: "Experiment 4",
        nameIperf: "Experiment 4",
        end_time: 1705389926549,
        test_runs: [
          {
            id: 370,
            algorithm: "mlkem512",
            ipsec: "mlkem512",
            time: 5,
            connections: 1,
            messageSizeIperf: 16,
            bandwidth: 1000,
            intervals: 0.5,
            iterations: 500,
            message_size: 1024
          },
          {
            id: 371,
            algorithm: "mlkem512",
            ipsec: "mlkem512",
            time: 10,
            connections: 3,
            messageSizeIperf: 1024,
            bandwidth: 100000,
            intervals: 1,
            iterations: 1000,
            message_size: 2048
          }
        ]
      }
    ];

    (useFetch as jest.Mock).mockReturnValue({
      get: jest.fn(),
      data: allExperimentsMockData,
      cancelRequest: jest.fn(),
    });

    const { result } = renderHook(() => useExperimentsData());
    expect(result.current.testSuites.length).toEqual(allExperimentsMockData.length);
  });
});
