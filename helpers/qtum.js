const { networks, generateMnemonic } = require('qtumjs-wallet')


const network = networks.testnet
let wallet


const getWalletInfo = () => {
  const publicAddress = wallet.address
  const privateKey    = wallet.toWIF()

  return {
    privateKey,
    address: publicAddress,
  }
}

const createWallet = () => {
  const mnemonic  = generateMnemonic()
  const password  = 'superstrong'

  wallet = network.fromMnemonic(mnemonic, password)

  return wallet
}

const restoreWallet = (privateKey) => {
  wallet = network.fromPrivateKey(privateKey)

  return wallet
}

const getBalance = async () => {
  const info = await wallet.getInfo()

  return info.balance
}

const sendMoney = async (to, amount) => {
  const { txid: transactionId } = await wallet.send(to, amount * 1e8, {
    feeRate: 1000,
  })

  return transactionId
}


module.exports = {
  createWallet,
  restoreWallet,
  getBalance,
  sendMoney,
  getWalletInfo,
}
