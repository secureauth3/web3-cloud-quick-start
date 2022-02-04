import  React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import './nfts.css';
import { selectNFTsList } from "./nftsSlice";

export default function NFTs() {
    const navigate = useNavigate();
    const nftList = useAppSelector(selectNFTsList);

    const selectNFT = (event: any, id: string) => {
        event.preventDefault();
        navigate(`/nfta/${id}`);
    }

    const renderNFTData = (nft: any) => {
        return (
            <tr key={nft.id} className="nft-select" onClick={(e) => selectNFT(e, nft.account)}>
                <th>{nft.name}</th>
                <td>{nft.email}</td>
                <td>{nft.owner}</td>
            </tr>
        );
    }

    return( 
        <div className="nfts">
                <div>
                    <h3>Listing all NFTs for </h3>
                    <hr></hr>
                    {nftList.length > 0 &&
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Owner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nftList.map((nft) => renderNFTData(nft))}
                            </tbody>
                        </table>
                    }
                </div>              
        </div>
    );
}
