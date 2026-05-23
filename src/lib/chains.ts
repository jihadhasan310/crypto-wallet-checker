export type ChainSlug = "ethereum" | "polygon" | "bsc" | "arbitrum" | "optimism" | "avalanche" | "base" | "fantom";

export interface ChainConfig {
  slug: ChainSlug;
  id: string;
  name: string;
  explorer: string;
  nativeSymbol: string;
  sampleToken: string;
  sampleLabel: string;
}

export const CHAINS: Record<ChainSlug, ChainConfig> = {
  ethereum: {
    slug: "ethereum",
    id: "1",
    name: "Ethereum",
    explorer: "https://etherscan.io",
    nativeSymbol: "ETH",
    sampleToken: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    sampleLabel: "USDT",
  },
  polygon: {
    slug: "polygon",
    id: "137",
    name: "Polygon",
    explorer: "https://polygonscan.com",
    nativeSymbol: "MATIC",
    sampleToken: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    sampleLabel: "USDT",
  },
  bsc: {
    slug: "bsc",
    id: "56",
    name: "BNB Smart Chain",
    explorer: "https://bscscan.com",
    nativeSymbol: "BNB",
    sampleToken: "0x55d398326f99059fF775485246999027B3197955",
    sampleLabel: "USDT",
  },
  arbitrum: {
    slug: "arbitrum",
    id: "42161",
    name: "Arbitrum One",
    explorer: "https://arbiscan.io",
    nativeSymbol: "ETH",
    sampleToken: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    sampleLabel: "USDT",
  },
  optimism: {
    slug: "optimism",
    id: "10",
    name: "Optimism",
    explorer: "https://optimistic.etherscan.io",
    nativeSymbol: "ETH",
    sampleToken: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    sampleLabel: "USDT",
  },
  avalanche: {
    slug: "avalanche",
    id: "43114",
    name: "Avalanche C-Chain",
    explorer: "https://snowtrace.io",
    nativeSymbol: "AVAX",
    sampleToken: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    sampleLabel: "USDT",
  },
  base: {
    slug: "base",
    id: "8453",
    name: "Base",
    explorer: "https://basescan.org",
    nativeSymbol: "ETH",
    sampleToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    sampleLabel: "USDC",
  },
  fantom: {
    slug: "fantom",
    id: "250",
    name: "Fantom",
    explorer: "https://ftmscan.com",
    nativeSymbol: "FTM",
    sampleToken: "0x049d68029688eAbF473097a2fC38ef61633A3C7A",
    sampleLabel: "USDT",
  },
};

export const DEFAULT_CHAIN: ChainSlug = "ethereum";

export const CHAIN_LIST = Object.values(CHAINS);

export function getChain(slug: string | null | undefined): ChainConfig | null {
  if (!slug) return null;
  return CHAINS[slug as ChainSlug] ?? null;
}

export function getTxExplorerUrl(chain: ChainConfig, hash: string): string {
  return `${chain.explorer}/tx/${hash}`;
}

export function getAddressExplorerUrl(chain: ChainConfig, address: string): string {
  return `${chain.explorer}/address/${address}`;
}
