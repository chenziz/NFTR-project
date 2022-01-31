Quick-Deploy Guidance

1.安装nodejs
2.在NFTR终端里执行

```
npm i
```

3.在fe终端里执行(react)

```
npm i
```

4.在NFTR终端里执行

```
npm install ethers hardhat @nomiclabs/hardhat-waffle \
ethereum-waffle chai @nomiclabs/hardhat-ethers \
web3modal @openzeppelin/contracts ipfs-http-client@50.1.2 \
axios
```

5.在NFTR终端里执行部署hardhat本地网络

```
npx hardhat node
```

选取网络中的某一个节点作为后续的钱包交互地址

6.将合约部署在本地节点上

```
npx hardhat run scripts/deploy.js --network localhost
```

7.将部署后的地址放入config.js文件里的market-contract-address和NFT-contract-address

8.运行前端

```
npm run dev
```



运行成功后，使用手册见

https://docs.qq.com/doc/DZGVzY0VpS2p2a1RV?