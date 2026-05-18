import { isValidEthAddress } from "./validation";

/**
 * Set your donation wallet here, or use NEXT_PUBLIC_DONATION_WALLET in .env / Vercel.
 * Example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
 */
export const DONATION_WALLET_ADDRESS = "";

const configured =
  process.env.NEXT_PUBLIC_DONATION_WALLET?.trim() || DONATION_WALLET_ADDRESS.trim();

export const DONATION_WALLET = configured;
export const DONATION_ENABLED = isValidEthAddress(configured);
