const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export function isValidEthAddress(address: string): boolean {
  return ETH_ADDRESS_REGEX.test(address.trim());
}

export function normalizeAddress(address: string): string {
  return address.trim().toLowerCase();
}
