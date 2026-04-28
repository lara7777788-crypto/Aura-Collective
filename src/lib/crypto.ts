// Crypto payment configuration: USDC on Base, Polygon, Ethereum
export type ChainKey = "base" | "polygon" | "ethereum";

export const CHAINS: Record<ChainKey, {
  id: number;
  hexId: string;
  name: string;
  rpc: string;
  explorer: string;
  usdc: `0x${string}`;
  usdcDecimals: number;
  nativeCurrency: { name: string; symbol: string; decimals: number };
}> = {
  base: {
    id: 8453,
    hexId: "0x2105",
    name: "Base",
    rpc: "https://mainnet.base.org",
    explorer: "https://basescan.org",
    usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    usdcDecimals: 6,
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  polygon: {
    id: 137,
    hexId: "0x89",
    name: "Polygon",
    rpc: "https://polygon-rpc.com",
    explorer: "https://polygonscan.com",
    usdc: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    usdcDecimals: 6,
    nativeCurrency: { name: "Polygon", symbol: "POL", decimals: 18 },
  },
  ethereum: {
    id: 1,
    hexId: "0x1",
    name: "Ethereum",
    rpc: "https://eth.llamarpc.com",
    explorer: "https://etherscan.io",
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    usdcDecimals: 6,
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
};

// Pricing tiers: monthly + 6mo (10% off) + 12mo (20% off)
export type Tier = "starter" | "glow" | "constellation";
export type Duration = 1 | 6 | 12;

const MONTHLY: Record<Tier, number> = {
  starter: 3,
  glow: 5,
  constellation: 8,
};

const DISCOUNT: Record<Duration, number> = {
  1: 0,
  6: 0.10,
  12: 0.20,
};

export function priceUsd(tier: Tier, months: Duration): number {
  const base = MONTHLY[tier] * months;
  return Math.round(base * (1 - DISCOUNT[months]) * 100) / 100;
}

export function tierLabel(t: Tier) {
  return t === "starter" ? "Starter" : t === "glow" ? "Glow" : "Constellation";
}
