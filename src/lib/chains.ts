export type ChainSlug = "ethereum" | "polygon";

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
