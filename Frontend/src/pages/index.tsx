import { Footer, Header, NFTCard } from "@/components";
import { contractAddress } from "@/consts/parameters";
import useDebounce from "@/hooks/useDebounce";
 
import { SearchIcon } from "@/icons/SearchIcon";
import {
  NFT,
  useContract,
  useContractMetadata,
  useNFTs,
  useTotalCount,
  useOwnedNFTs,
   useAddress,
   useMetamask
} from "@thirdweb-dev/react";
import { useMintNFT } from "@thirdweb-dev/react";

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { ref,set,get,update,remove,child,onValue } from "firebase/database";

function App() {
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


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database =  getDatabase(app);

  const address = useAddress();
  const connectWithMetamask = useMetamask();
  // console.log(address)
  const nftsPerPage = 30;
  const { contract } = useContract(contractAddress);
  // const { data, isLoading, error } = useOwnedNFTs(contract, "0x492dE735ed6D00163309A4FDBdBC8f094eD8D1D2");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const { data: nfts, isLoading } = useOwnedNFTs(contract, address);
  const { mutate: mintNft } = useMintNFT(contract);
  // const { data: nfts, isLoading } = useNFTs(contract, {
  //   count: nftsPerPage,
  //   start: (page - 1) * nftsPerPage,
  // });
  const { data: totalCount } = useTotalCount(contract);
  const { data: contractMetadata, isLoading: contractLoading } =
    useContractMetadata(contract);
  const [nft, setNft] = useState<NFT | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const fetchNFT = async () => {
    const nft = await contract?.erc721.get(debouncedSearchTerm);
    setNft(nft!);
    setIsSearching(false);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      fetchNFT();
    } else {
      setNft(null);
    }
  }, [debouncedSearchTerm]);
  console.log(nfts)
  if(!address){
    return (
    <div className="m-0 bg-[#0A0A0A] p-0 font-inter text-neutral-200">
      <Header />

      <Helmet>
        <title>{contractMetadata?.name}</title>
      </Helmet>
    
      <div className="z-20 mx-auto flex min-h-screen w-full flex-col px-4">
    
        {contractMetadata ? (
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white">
              {contractMetadata.name}
            </h1>
            <h2 className="text-xl font-bold text-white">
              {contractMetadata.description}
            </h2>
          </div>
          
        ) : contractLoading ? (
          <div className="mx-auto mb-8 text-center">
            <div className="mx-auto h-8 w-96 animate-pulse rounded-lg bg-gray-800" />
            <div className="mx-auto mt-4 h-8 w-96 animate-pulse rounded-lg bg-gray-800" />
          </div>
        ) : null}
   
        <div className="mx-auto mb-8 flex h-12 w-96 max-w-full items-center rounded-lg border border-white/10 bg-white/5 px-4 text-xl text-white">
        
          <SearchIcon />
          <input
            type="text"
            onChange={(e) => {
              if (
                e.target.value.match(/^[0-9]*$/) &&
                Number(e.target.value) > 0
              ) {
                setSearch(e.target.value);
              } else {
                setSearch("");
              }
            }}
            placeholder="Search by ID"
            className="w-full bg-transparent px-4 text-white focus:outline-none"
          />
            
        </div>

        {isSearching ? (
          <div className="mx-auto !h-60 !w-60 animate-pulse rounded-lg bg-gray-800" />
        ) : null}

        {search && nft && !isSearching ? (
          <NFTCard nft={nft} key={nft.metadata.id} />
          
        ) : null}

        {isLoading && (
          <div className="mx-auto flex flex-wrap items-center justify-center gap-8">
            {Array.from({ length: nftsPerPage }).map((_, i) => (
              <div className="!h-60 !w-60 animate-pulse rounded-lg bg-gray-800" />
            ))}
          </div>
        )}

        {nfts && !search && (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {nfts.map((nft) => (
              <NFTCard nft={nft} key={nft.metadata.id} />
            ))}
          </div>
          
        )}
              <div className="z-20 mx-auto flex  w-full flex-wrap items-center justify-center px-4"
      style={{
        display: 'flex',
        paddingTop:'20px'
        }}>
    </div>
        {!search && (
          <Footer
            page={page}
            setPage={setPage}
            nftsPerPage={nftsPerPage}
            totalCount={totalCount}
            loading={isLoading}
          />
        )}
      </div>
    </div>
    )
  }
  if(address){
  return (
    <div className="m-0 bg-[#0A0A0A] p-0 font-inter text-neutral-200">
      <Header />

      <Helmet>
        <title>{contractMetadata?.name}</title>
      </Helmet>
    
      <div className="z-20 mx-auto flex min-h-screen w-full flex-col px-4">
    
        {contractMetadata ? (
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white">
              {contractMetadata.name}
            </h1>
            <h2 className="text-xl font-bold text-white">
              {contractMetadata.description}
            </h2>
          </div>
          
        ) : contractLoading ? (
          <div className="mx-auto mb-8 text-center">
            <div className="mx-auto h-8 w-96 animate-pulse rounded-lg bg-gray-800" />
            <div className="mx-auto mt-4 h-8 w-96 animate-pulse rounded-lg bg-gray-800" />
          </div>
        ) : null}
   
        <div className="mx-auto mb-8 flex h-12 w-96 max-w-full items-center rounded-lg border border-white/10 bg-white/5 px-4 text-xl text-white">
        
          <SearchIcon />
          <input
            type="text"
            onChange={(e) => {
              if (
                e.target.value.match(/^[0-9]*$/) &&
                Number(e.target.value) > 0
              ) {
                setSearch(e.target.value);
              } else {
                setSearch("");
              }
            }}
            placeholder="Search by ID"
            className="w-full bg-transparent px-4 text-white focus:outline-none"
          />
            
        </div>

        {isSearching ? (
          <div className="mx-auto !h-60 !w-60 animate-pulse rounded-lg bg-gray-800" />
        ) : null}

        {search && nft && !isSearching ? (
          <NFTCard nft={nft} key={nft.metadata.id} />
          
        ) : null}

        {isLoading && (
          <div className="mx-auto flex flex-wrap items-center justify-center gap-8">
            {Array.from({ length: nftsPerPage }).map((_, i) => (
              <div className="!h-60 !w-60 animate-pulse rounded-lg bg-gray-800" />
            ))}
          </div>
        )}

        {nfts && !search && (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {nfts.map((nft) => (
              <NFTCard nft={nft} key={nft.metadata.id} />
            ))}
          </div>
          
        )}
              <div className="z-20 mx-auto flex  w-full flex-wrap items-center justify-center px-4"
      style={{
        display: 'flex',
        paddingTop:'20px'
        }}>

      
      <button 
        style={{
          backgroundColor: 'white',
          color: 'black',
          width:"80px",
          height:40,
          borderRadius: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      onClick={() =>

        mintNft({
          
          metadata: {
            name: "Nft 6",
            power: { plant: 3, fire: 90, water: 80, earth: 82, ice: 14 },
            origin: 'demons',
            image: 'https://apeofmars.s3.ap-south-1.amazonaws.com/Ape3.jpeg',
            rarity: 'legendary',
            powerLevel: 6,
            powerValue: 83,
            mineRate: 50,
            coolDifferenceTime: 20,
          },
          to: address,
        })
      }
    >
      Mint
    </button>
    </div>
        {!search && (
          <Footer
            page={page}
            setPage={setPage}
            nftsPerPage={nftsPerPage}
            totalCount={totalCount}
            loading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
}

export default App;
