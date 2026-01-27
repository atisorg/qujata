// (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import { act, renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { FetchDataStatus, useFetch } from '../shared/hooks/useFetch';
import { useDashboardData } from './useDashboardData';
import { ITestParamsTLS, ITestParamsIpsec } from '../shared/models/quantum.interface';

jest.mock('../shared/hooks/useFetch');
  
describe('useDashboardData', () => {
  test('Should show error message for Error mode', async () => {
    (useFetch as jest.Mock).mockReturnValue({
      error: { message: 'error' },
      status: FetchDataStatus.Error,
      post: jest.fn(),
      cancelRequest: jest.fn(),
    });
    renderHook(() => useDashboardData());
    await waitFor(() => {
      expect('error').toBeTruthy();
    });
  });

  test('Should be in Success mode', () => {
    const mockData = { linkToResult: { from: '1698747472962', to: '1698747480624' } };
    (useFetch as jest.Mock).mockReturnValue({
      status: FetchDataStatus.Success,
      post: jest.fn(),
      cancelRequest: jest.fn(),
      data: mockData,
    });
    const { result } = renderHook(() => useDashboardData());
    expect(result.current.status).toEqual(FetchDataStatus.Success);
  });

  it('calls the appropriate functions when handleRunQueryClick is called', () => {
    const post = jest.fn();

    // Mock the return value of useFetch
    (useFetch as jest.Mock).mockReturnValue({
      post,
      data: null,
      status: FetchDataStatus.Init,
      error: null,
      cancelRequest: jest.fn(),
    });

    const { result } = renderHook(() => useDashboardData());

    const testDataTLS: ITestParamsTLS = {
      experimentName: 'test',
      algorithms: [{ label: 'algo1', value: 'algo1' }, { label: 'algo2', value: 'algo2' }, { label: 'algo3', value: 'algo3' }, { label: 'algo4', value: 'algo4' }],
      iterationsCount: [{ label: '1000', value: '1000' }],
      messageSizes: [{ label: '1024', value: '1024' }],
      description: 'test'
    };

    const testDataIpsec: ITestParamsIpsec = {
      experimentNameIperf: 'test',
      ipsecAlgorithms: [{ label: 'algo1', value: 'algo1' }, { label: 'algo2', value: 'algo2' }, { label: 'algo3', value: 'algo3' }],
      time: [{ label: '5', value: '5' }, { label: '10', value: '10' }, { label: '20', value: '20' }],
      connections: [{ label: '1', value: '1' }, { label: '3', value: '3' }, { label: '5', value: '5' }],
      messageSizeIperf: [{ label: '16', value: '16' }, { label: '1024', value: '1024' }, { label: '65507', value: '65507' }],
      bandwidth: [{ label: '1', value: '1000' }, { label: '100', value: '100000' }, { label: '1000', value: '100000000' }],
      intervals: [{ label: '0.5', value: '0.5' }, { label: '1', value: '1' }, { label: '2', value: '2' }],
      descriptionIperf: 'test'
    };


    act(() => {
      result.current.handleRunQueryClickTLS(testDataTLS);
    });

    act(() => {
      result.current.handleRunQueryClickIpsec(testDataIpsec);
    });

    expect(post).toHaveBeenCalledWith({
      data: {
        experimentName: 'test',
        experimentNameIperf: 'test',
        algorithms: ['algo1', 'algo2', 'algo3', 'algo4'],
	ipsecAlgorithms: ['algo1', 'algo2', 'algo3'],
        time: [5],
        connections: [1],
        messageSizeIperf: [16],
        bandwidth: [1000],
        intervals: [0.5],
        iterationsCount: [1000],
        messageSizes: [1024],
        description: 'test',
        descriptionIperf: 'test'
      }
    });
  });
});
