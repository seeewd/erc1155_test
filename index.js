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

async function updateTokenURI() {
  const tokenIdInput = document.getElementById('tokenId')
  const tokenId = parseInt(tokenIdInput.value)
  const emotionInput = document.getElementById('emotion')
  const emotion = emotionInput.value

  if (tokenId && emotion) {
    await updateDynamicNFT(tokenId, emotion)
    alert('Token URI updated successfully!')
  } else {
    alert('Please enter a token ID and an emotion.')
  }
}

async function updateDynamicNFT(tokenId, emotion) {
  const web3 = window.web3
  const accounts = await web3.eth.getAccounts()
  const contract = new web3.eth.Contract(DynamicNFT_ABI, DynamicNFT_address)

  const tokenURI = `https://example.com/api/token/${emotion}/${tokenId}`

  await contract.methods
    .updateTokenURI(tokenId, tokenURI)
    .send({ from: accounts[0] })
}
