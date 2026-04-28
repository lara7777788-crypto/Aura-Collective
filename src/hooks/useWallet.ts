import { useEffect, useState, useCallback } from "react";
import { CHAINS, type ChainKey } from "@/lib/crypto";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const hasMetaMask = typeof window !== "undefined" && !!window.ethereum;

  useEffect(() => {
    if (!hasMetaMask) return;
    window.ethereum.request({ method: "eth_accounts" }).then((accs: string[]) => {
      if (accs?.[0]) setAddress(accs[0]);
    }).catch(() => {});
    window.ethereum.request({ method: "eth_chainId" }).then((c: string) => setChainId(c)).catch(() => {});

    const onAccs = (accs: string[]) => setAddress(accs?.[0] ?? null);
    const onChain = (c: string) => setChainId(c);
    window.ethereum.on?.("accountsChanged", onAccs);
    window.ethereum.on?.("chainChanged", onChain);
    return () => {
      window.ethereum.removeListener?.("accountsChanged", onAccs);
      window.ethereum.removeListener?.("chainChanged", onChain);
    };
  }, [hasMetaMask]);

  const connect = useCallback(async () => {
    if (!hasMetaMask) {
      window.open("https://metamask.io/download/", "_blank");
      return;
    }
    setConnecting(true);
    try {
      const accs: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAddress(accs[0] ?? null);
    } finally {
      setConnecting(false);
    }
  }, [hasMetaMask]);

  const switchChain = useCallback(async (key: ChainKey) => {
    const chain = CHAINS[key];
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chain.hexId }],
      });
    } catch (e: any) {
      if (e?.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: chain.hexId,
            chainName: chain.name,
            rpcUrls: [chain.rpc],
            nativeCurrency: chain.nativeCurrency,
            blockExplorerUrls: [chain.explorer],
          }],
        });
      } else {
        throw e;
      }
    }
  }, []);

  return { address, chainId, connect, connecting, switchChain, hasMetaMask };
}
