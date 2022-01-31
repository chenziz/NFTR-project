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

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
      
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
        description: meta.data.description,
        name: meta.data.name,
      }
      return item
    }))
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded') 
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>)
  
  return (
     





    <div className="assets">
      <div className="count">
      <h2 className="text-2xl py-2">Items Created</h2>
      <Row gutter={[16, 20]}>
                    {
                        nfts.map((nft, i) => (
                            <Col span={6} key={i}>
                                <Card
                                    className="assets-card"
                                    hoverable
                                    cover={<img width='323px' height="323px" alt="example" src={nft.image}  />}
                                >
                                  <Card.Meta
                    className="w-meat"
                    title={
                      <>
                        <span className="price">{nft.name}</span>
                        <span> {nft.descripgtion}</span>
                        <span className="price">${nft.price}</span>
                      </>
                    }
                    description={<span title={nft.description}>{nft.description}</span>}
                  />
                                    <Card.Meta
                                        title={nft.itemId}
                                        description={<span title={nft.description}>{nft.description}</span>}

                                        description={nft.fileUrl}
                                    />
                                </Card>
                            </Col>
                        ))
                    }

      </Row>
    </div>

        <div 
        className="assets">
        <h2 
        style={{
          marginTop: '40px'}}
        className="text-2xl py-2">Items Sold
       
        </h2>
        {
          Boolean(sold.length) && (
            <Row gutter={[16, 20]}>
                    {
                        nfts.map((nft, i) => (
                            <Col span={6} key={i}>
                                <Card
                                    className="assets-card"
                                    hoverable
                                    cover={<img width='323px' height="323px" alt="example" src={nft.image}  />}
                                >
                                  <Card.Meta
                    className="w-meat"
                    title={
                      <>
                        <span className="price">{nft.name}</span>
                        <span> {nft.descripgtion}</span>
                        <span className="price">${nft.price}</span>
                      </>
                    }
                    description={<span title={nft.description}>{nft.description}</span>}
                  />
                                    <Card.Meta
                                        title={nft.itemId}
                                        description={<span title={nft.description}>{nft.description}</span>}

                                        description={nft.fileUrl}
                                    />
                                </Card>
                            </Col>
                        ))
                    }

      </Row>
          )
        }
        </div>
    </div>
  )
}