const bitcoin = require('bitcoinjs-lib')
const axios = require('axios')


const network = bitcoin.networks.testnet

const createAccount = () => {
  const privateKey = bitcoin.ECPair.makeRandom({ network }).toWIF()

  console.log('privateKey:', privateKey)

  return restoreAccount(privateKey)
}

const restoreAccount = (privateKey) => {
  return new bitcoin.ECPair.fromWIF(privateKey, network)
}

const getPublicKey = (account) => account.getPublicKeyBuffer().toString('hex')

const fetchBalance = (address) =>
  axios.get(`https://test-insight.bitpay.com/api/addr/${address}`)
    .then(({ data }) => data)
    .then(({ balance }) => {
      console.log('BTC Balance:', balance)

      return balance
    })

const fetchUnspents = (address) =>
  axios.get(`https://test-insight.bitpay.com/api/addr/${address}/utxo`)
    .then(({ data }) => data)

const broadcastTx = (txRaw) =>
  axios.post('https://test-insight.bitpay.com/api/tx/send', {
    rawtx: txRaw,
  })
    .then(({ data }) => data)


module.exports = {
  bitcoin,
  network,

  createAccount,
  restoreAccount,
  getPublicKey,
  fetchBalance,
  fetchUnspents,
  broadcastTx,
}
