import styles from "./styles/Home.module.css";
import {
  ThirdwebNftMedia,
  ConnectWallet,
  useAddress,
  useContract,
  useNFTs,
  useOwnedNFTs,
  Web3Button,
  useContractMetadata,
} from "@thirdweb-dev/react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import {ref, set,push ,onValue} from "firebase/database";
import type { NextPage } from "next";
import { useState } from "react";
import { NFT_COLLECTION_ADDRESS } from '../const/yourDetails';
import { Link } from "react-router-dom";
const Home: NextPage = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBs7zsMewLWsxXxMESHgxzib5MtgY_9ao4",
    authDomain: "apeofmars-30bd3.firebaseapp.com",
    projectId: "apeofmars-30bd3",
    databaseURL: "https://apeofmars-30bd3-default-rtdb.firebaseio.com/",
    storageBucket: "apeofmars-30bd3.appspot.com",
    messagingSenderId: "28414968159",
    appId: "1:28414968159:web:735e70b99ad76c381a76ea",
    measurementId: "G-0WC1V1954L"
  };
  const app = initializeApp(firebaseConfig);
  const address = useAddress(); 
  const [hover, setHover] = useState<boolean>(false);
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data: contractMetadata, isLoading: contractLoading } =
    useContractMetadata(contract);
  // Fetch the NFT collection from thirdweb via it's contract address.
  const { contract: nftCollection } = useContract(
    NFT_COLLECTION_ADDRESS,
    "nft-collection"
  );


  // Load all the minted NFTs in the collection
  // const { data: nfts, isLoading: loadingNfts } = useNFTs(nftCollection);
  const { data: nfts, isLoading:loadingNfts } = useOwnedNFTs(nftCollection, address);
  // console.log(nfts);
  // Here we store the user inputs for their NFT.
  const [nftName, setNftName] = useState<string>("");

  // This function calls a Next JS API route that mints an NFT with signature-based minting.
  // We send in the address of the current user, and the text they entered as part of the request.
  const mintWithSignature = async () => {
    try {
      // Make a request to /api/server
      const signedPayloadReq = await fetch(`/api/server`, {
        method: "POST",
        body: JSON.stringify({
          authorAddress: address, 
          nftName: nftName || "",
        }),
      });

      // Grab the JSON from the response
      const json = await signedPayloadReq.json();

      if (!signedPayloadReq.ok) {
        alert(json.error);
      }

      // If the request succeeded, we'll get the signed payload from the response.
      // The API should come back with a JSON object containing a field called signedPayload.
      // This line of code will parse the response and store it in a variable called signedPayload.
      const signedPayload = json.signedPayload;

      // Now we can call signature.mint and pass in the signed payload that we received from the server.
      // This means we provided a signature for the user to mint an NFT with.mintBatch(signatures);
      const nft = await nftCollection?.signature.mintBatch(signedPayload);
      // const nft = await nftCollection?.signature.mint(signedPayload);
      alert("Minted succesfully!");

      return nft;
    } catch (e) {
      console.error("An error occurred trying to mint the NFT:", e);
    }
  };
  
  return (
    
    <div className={styles.container}>
       {address ? <ConnectWallet theme="dark" />:<></>}
      <div className={styles.collectionContainer}>
    <h2>
      {contractMetadata?.name}
    </h2>
        <input
          type="text"
          placeholder="Search"
          className={styles.textInput}
          maxLength={26}
          // onChange={(e) => setNftName(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 24 }}>
      
      {address ? <Web3Button
          // contractAddress={process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS!}
          contractAddress="0x975eDbCcb2C2f804002f9c7268756aFcb77b2EC8"
          action={() => mintWithSignature()}
        >
          Mint NFT
        </Web3Button> : <ConnectWallet theme="dark" />}
        
      </div>

      <hr className={styles.smallDivider} />

      <div className={styles.collectionContainer}>
        <h2 className={styles.ourCollection}>Other Owned NFTs in this collection:</h2>

        {loadingNfts ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.nftGrid}>
            {nfts?.map((nft) => (
              <div className={styles.nftItem} key={nft.metadata.id.toString()}>
              <div style={{ textAlign: "center" }}
               onMouseEnter={() => setHover(true)}
               onMouseLeave={() => setHover(false)}
               >

                <ThirdwebNftMedia
          metadata={nft.metadata}
          
          />
          
          </div>
                <div style={{ textAlign: "center" }}>
                  <p>{nft.metadata.name}</p>
                 
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
