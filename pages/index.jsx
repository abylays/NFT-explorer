import { useState, useEffect } from 'react'
import {NFTCard} from "../components/nftCard"
import { NftSearchBar } from "../components/NftSearchBar";

const Home = () => {


  const [NFTs, setNFTs] = useState([])

  // contract address
  const contractAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

  // loading state
  const [loading, setLoading] = useState(false);
  // the search query state
  const [searchQuery, setSearchQuery] = useState("");
  // the search results state
  const [searchResult, setSearchResult] = useState(null);

  // the search query handler
  const handleChange = (e) => {
      setSearchQuery(e.target.value);
  };

  const fetchNFTsForCollection = async () => {
    if (contractAddress.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
      //qaaKUeunNJi6eQtpwYTmmoXs1zRoNcY5
      const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v3/${api_key}/getNFTsForContract/`;
      const fetchURL = `${baseURL}?contractAddress=${contractAddress}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }
  // The search function
  const searchNFTs = async () => {
    try {
      // Set the loading state to true
      setLoading(true);

      const options = {method: 'GET', headers: {accept: 'application/json'}};

      const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
      const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v3/${api_key}/searchContractMetadata`;
      const fetchURL = `${baseURL}?query=${searchQuery}`;
      const search_nfts = await fetch(fetchURL, options).then(data => data.json())
      if (search_nfts) {
        console.log("Search results:", search_nfts)
        setSearchResult(search_nfts)
        //Set the loading state to false
        setLoading(false);
      }  
    } catch (error) {
      // If there is an error, alert the user
      alert(error);

      // Set the loading state to false
      setLoading(false);
    }
  };


  // Fetch NFTs on mount
  useEffect(() => {
      fetchNFTsForCollection();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
      <NftSearchBar
        searchQuery={searchQuery}
        searchNFTs={searchNFTs}
        handleChange={handleChange}
      />
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
