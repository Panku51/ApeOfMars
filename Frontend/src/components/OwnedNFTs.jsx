import { useEffect } from 'react';
import { useOwnedNFTs,useContract, useAddress } from '@thirdweb-dev/react';

const contractAddress = "0x975eDbCcb2C2f804002f9c7268756aFcb77b2EC8";
const address = useAddress();
const { contract } = useContract(contractAddress);

function OwnedNFTs(contract, walletAddress ) {
    const { data, isLoading, error } = useOwnedNFTs(contract, "0x492dE735ed6D00163309A4FDBdBC8f094eD8D1D2");

  useEffect(() => {

  }, [data, isLoading, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data.map((nft) => (
        <div key={nft.metadata.id} className="nft-card">
          <img src={nft.metadata.image} alt={nft.metadata.name} />
          <div>
            <h3>{nft.metadata.name}</h3>
            <p>{nft.metadata.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OwnedNFTs;