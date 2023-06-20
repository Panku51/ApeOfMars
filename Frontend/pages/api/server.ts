import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

import "../styles/globals.css";
import { NFT_COLLECTION_ADDRESS } from "../../const/yourDetails";

export default async function server(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // De-structure the arguments we passed in out of the request body
    const { authorAddress, nftName } = JSON.parse(req.body);

    // You'll need to add your private key in a .env.local file in the root of your project
    // !!!!! NOTE !!!!! NEVER LEAK YOUR PRIVATE KEY to anyone!
    if (!process.env.PRIVATE_KEY) {
      throw new Error("You're missing PRIVATE_KEY in your .env.local file.");
    }

    // Initialize the Thirdweb SDK on the serverside
    const sdk = ThirdwebSDK.fromPrivateKey(
      // Your wallet private key (read it in from .env.local file)
      process.env.PRIVATE_KEY as string,
      "mumbai"
    );

    // Load the NFT Collection via it's contract address using the SDK
    const nftCollection = await sdk.getContract(
      // Use your NFT_COLLECTION_ADDRESS constant
      NFT_COLLECTION_ADDRESS,
      "nft-collection"
    );

 
    // const signedPayload = await nftCollection.signature.generate({
    //   to: authorAddress,
    //   metadata: {
    //     name: nftName as string,
    //     description: "An awesome animal NFT",
    //     image:"ipfs://QmPuGkbw4aEbWHK4Um3Bt1hkwPcjLHJYTpTB232nS3WZ1C/2.jpg"
    //   },
    // });
    const signedPayload = await nftCollection.signature.generateBatch([
      {
        to: authorAddress,
        metadata: {
          name: "aom4",
        description: "aom3",
        image:"https://apeofmars.s3.ap-south-1.amazonaws.com/Test3.jpeg"
        },
      },
      {
        to:authorAddress,
        metadata: {
          name: "aom4",
          description: "An awesome ape NFT",
          image:"https://apeofmars.s3.ap-south-1.amazonaws.com/Test4.jpeg"
        },
      },
      {
        to:authorAddress,
        metadata: {
          name: "aom5",
          description: "An awesome ape NFT",
          image:"https://apeofmars.s3.ap-south-1.amazonaws.com/Test5.jpeg"
        },
      }
    ]);
    // Return back the signedPayload to the client.
    res.status(200).json({
      signedPayload: JSON.parse(JSON.stringify(signedPayload)),
    });
  } catch (e) {
    res.status(500).json({ error: `Server error ${e}` });
  }
}
