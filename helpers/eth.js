const Web3 = require('web3')
const config = require('./config')


const web3 = new Web3(new Web3.providers.HttpProvider(config.ethProvider))
let account


const createAccount = () => {
  account = web3.eth.accounts.create()

  web3.eth.accounts.wallet.add(account.privateKey)

  return account
}

const restoreAccount = (privateKey) => {
  account = web3.eth.accounts.privateKeyToAccount(privateKey)

  web3.eth.accounts.wallet.add(account.privateKey)

  return account
}

const getBalance = () =>
  web3.eth.getBalance(account.address)
    .then((amount) => web3.utils.fromWei(amount))

const sendMoney = async (to, amount) => {

}


module.exports = {
  web3,

  createAccount,
  restoreAccount,
  getBalance,
  sendMoney,
}
