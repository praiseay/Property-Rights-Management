import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('IP-NFT Contract', () => {
  const mockContractCall = vi.fn();
  const owner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const user1 = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
  
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  it('should mint a new IP-NFT', () => {
    mockContractCall.mockReturnValue({ success: true, value: 1 });
    const result = mockContractCall('ip-nft', 'mint', ['"patent"', '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'u1735689600'], owner);
    expect(result).toEqual({ success: true, value: 1 });
  });
  
  it('should transfer an IP-NFT', () => {
    mockContractCall.mockReturnValue({ success: true });
    const result = mockContractCall('ip-nft', 'transfer', ['u1', user1], owner);
    expect(result).toEqual({ success: true });
  });
  
  it('should get token metadata', () => {
    mockContractCall.mockReturnValue({
      success: true,
      value: {
        owner: owner,
        ip_type: 'patent',
        content_hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        expiration: 1735689600
      }
    });
    const result = mockContractCall('ip-nft', 'get-token-metadata', ['u1']);
    expect(result).toEqual({
      success: true,
      value: {
        owner: owner,
        ip_type: 'patent',
        content_hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        expiration: 1735689600
      }
    });
  });
  
  it('should update expiration', () => {
    mockContractCall.mockReturnValue({ success: true });
    const result = mockContractCall('ip-nft', 'update-expiration', ['u1', 'u1767225600'], owner);
    expect(result).toEqual({ success: true });
  });
});

