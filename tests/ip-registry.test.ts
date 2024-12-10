import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('IP Registry Contract', () => {
  const mockContractCall = vi.fn();
  const owner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const newOwner = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
  
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  it('should register IP', () => {
    mockContractCall.mockReturnValue({ success: true });
    const result = mockContractCall('ip-registry', 'register-ip', ['0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', '"patent"', 'u1'], owner);
    expect(result).toEqual({ success: true });
  });
  
  it('should get IP info', () => {
    mockContractCall.mockReturnValue({
      success: true,
      value: {
        owner: owner,
        ip_type: 'patent',
        registration_date: 123456,
        ip_nft_id: 1
      }
    });
    const result = mockContractCall('ip-registry', 'get-ip-info', ['0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef']);
    expect(result).toEqual({
      success: true,
      value: {
        owner: owner,
        ip_type: 'patent',
        registration_date: 123456,
        ip_nft_id: 1
      }
    });
  });
  
  it('should update IP owner', () => {
    mockContractCall.mockReturnValue({ success: true });
    const result = mockContractCall('ip-registry', 'update-ip-owner', ['0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', newOwner], owner);
    expect(result).toEqual({ success: true });
  });
});

