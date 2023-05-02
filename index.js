const Web3 = require('web3')

async function initWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  } else {
    window.alert(
      'Please install MetaMask or another Ethereum-compatible browser extension.',
    )
  }
}

initWeb3()

async function mintDynamicNFT(emotion) {
  const web3 = window.web3
  const accounts = await web3.eth.getAccounts()
  const contract = new web3.eth.Contract(DynamicNFT_ABI, DynamicNFT_address)

  const tokenId = generateTokenId() // A function to generate a unique token ID
  const tokenURI = `https://example.com/api/token/${emotion}/${tokenId}`

  await contract.methods
    .mint(accounts[0], tokenId, 1, tokenURI)
    .send({ from: accounts[0] })
}
