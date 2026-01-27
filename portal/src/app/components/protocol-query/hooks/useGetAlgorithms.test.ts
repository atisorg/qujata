// (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import { renderHook } from '@testing-library/react';
import { useFetch } from '../../../shared/hooks/useFetch';
import { useGetAlgorithms } from './useGetAlgorithms';
import { algorithmSections } from '../constants';

jest.mock('../../../shared/hooks/useFetch', () => ({
  useFetch: jest.fn(),
}));
  
describe('useGetAlgorithms', () => {
  test('Should be in Success mode', () => {
    const mockData = {
      classic: ["prime256v1","secp384r1"],
      hybrid: ["p256_mlkem512","p384_mlkem768","X25519MLKEM768"],
      quantumSafe: ["bikel1","bikel3","mlkem512","mlkem768","mlkem1024","frodo640aes","frodo640shake","frodo976aes","frodo976shake","frodo1344aes","frodo1344shake"]
    };

    (useFetch as jest.Mock).mockReturnValue({
      get: jest.fn(),
      data: mockData,
      cancelRequest: jest.fn(),
    });

    const { result } = renderHook(() => useGetAlgorithms());
    const mockDataNumOfAlgos = mockData.classic.length + mockData.hybrid.length + mockData.quantumSafe.length;
    expect(result.current.algorithmOptions.length).toEqual(mockDataNumOfAlgos + algorithmSections.length);
  });
});
