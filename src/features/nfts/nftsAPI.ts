import { NFTProps } from "./nftsSlice";

export function listOwnerNFTs(account: string) {
  return new Promise<{ data: any }>((resolve) => {
    setTimeout(() => resolve({ data: [
      {
        id: 'nft1',
        name: 'NFT One',
        owner: account,
      } as NFTProps,
      {
        id: 'nft2',
        name: 'NFT Two',
        owner: account,
      } as NFTProps
      ]
    }), 500)
  }
  );
}