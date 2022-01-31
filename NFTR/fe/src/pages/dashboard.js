import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import { Card, Col, Row, Button } from "antd";

import {
  nftaddress, nftmarketaddress
} from "../config"

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTmarket.sol/NFTMarket.json'


let rpcEndpoint = null

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL
}

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {    
    const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const data = await marketContract.fetchMarketItems()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        description: meta.data.description,
        name: meta.data.name,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }
  async function buyNft(nft) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nftaddress, nft.itemId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }  
  if (loadingState === 'loaded' && !nfts.length) return (<h1>No items in marketplace</h1>)
  /*
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p>
                  <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}*/
  
  return (
    <div className="assets">
      <p className="count"></p>
      <br />
      <div>
        <Row gutter={[16, 20]}>
          {(
            nfts.map((nft, i) => (
              <Col span={6} key={i}>
                <Card
                  className="assets-card"
                  hoverable
                  cover={
                    <img
                      width="323px"
                      height="323px"
                      alt="example"
                      src={nft.image}
                    />
                  }
                >
                  <Card.Meta
                    className="w-meat"
                    title={
                      <>
                        <span>{nft.name}</span>
                        <span className="price">{nft.price}Matic</span>
                      </>
                    }
                    description={<span title={nft.description}>{nft.description}</span>}
                  />
                  <br />
                  {(
                    <Card.Meta
                      description={
                        <Button
                          className="btns"
                          type="primary"
                          block
                          onClick={() => {
                            buyNft(nft);
                          }}
                        >
                          Buy
                        </Button>
                      }
                    />
                  )}
                </Card>
              </Col>
            ))
          
          )}
        </Row>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
