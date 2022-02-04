import  React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { NFTProps, selectNFTsList } from "../nftsSlice";

export default function NFT() {
    const nftsList = useAppSelector(selectNFTsList);
    let { id } = useParams();
    const [nft, setNFT] = useState({} as NFTProps);
    
    useEffect(() => {
        let foundNFT: NFTProps = {
            id: '',
            name: '',
            owner: ''
        };
        nftsList.forEach((nft: NFTProps) => {
            if (nft.id === id) {
                foundNFT = nft;
                setNFT(foundNFT);
                return;
            }
        });
    });

    return (
        <div>
            <h3>NFT is owner by {nft.owner}</h3>
            <div>
                <div>
                    <p>Id: {nft.id}</p>
                    <p>Name: {nft.name}</p>
                </div>
            </div>
        </div>
    );
}