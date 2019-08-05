const { Alice, Bob } = require('./participants')
const { web3 } = require('./eth')


class Contract {

  constructor() {
    this.gasLimit = 3e6
    this.abi      = [
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          },
          {
            "name": "",
            "type": "address"
          }
        ],
        "name": "swaps",
        "outputs": [
          {
            "name": "participantAddress",
            "type": "address"
          },
          {
            "name": "secret",
            "type": "bytes32"
          },
          {
            "name": "secretHash",
            "type": "bytes20"
          },
          {
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "name": "balance",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_secretHash",
            "type": "bytes20"
          },
          {
            "name": "_participantAddress",
            "type": "address"
          }
        ],
        "name": "createSwap",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_ownerAddress",
            "type": "address"
          },
          {
            "name": "_participantAddress",
            "type": "address"
          }
        ],
        "name": "getSecret",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_ownerAddress",
            "type": "address"
          },
          {
            "name": "_participantAddress",
            "type": "address"
          }
        ],
        "name": "getBalance",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_secret",
            "type": "bytes32"
          },
          {
            "name": "_ownerAddress",
            "type": "address"
          },
          {
            "name": "_participantAddress",
            "type": "address"
          }
        ],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_participantAddress",
            "type": "address"
          }
        ],
        "name": "refund",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    this.address  = '0x898199A0d05201D6AFFbcb27c1723fBb588aA2f4'
    this.contract = new web3.eth.Contract(this.abi, this.address)
  }

  call(method, args, params = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(`\nStart ethContract.${method}()`)

        const data = await this.contract.methods[method](...args).call(params)

        console.log(`Success ethContract.${method}()`)
        resolve(data)
      }
      catch (err) {
        console.log(`Fail ethContract.${method}(). Error:`, err)
        reject(err)
      }
    })
  }

  send(method, args, params = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        let error
        let transactionHash

        console.log(`\nStart ethContract.${method}()`)

        const data = await this.contract.methods[method](...args).send({
          ...params,
          gas: this.gasLimit,
        })
          .on('transactionHash', (hash) => {
            console.log(`\rethContract.${method}() transaction:`, hash)

            transactionHash = hash
          })
          .on('error', (err) => {
            error = err

            console.log(`Error ethContract.${method}(). Error:`, err)
            reject({ error, transactionHash })
          })

        if (!error) {
          console.log(`Success ethContract.${method}()`)
          resolve({ data, transactionHash })
        }
      }
      catch (err) {
        console.log(`Fail ethContract.${method}(). Error:`, err)
        reject(err)
      }
    })
  }

  fund(secretHash) {
    const amount      = 0.1
    const amountWei   = web3.utils.toWei(amount.toString())

    const args        = [ `0x${secretHash}`, Bob.info.eth.address ]
    const params      = { from: Alice.info.eth.address, value: amountWei }

    return this.send('createSwap', args, params)
  }

  getBalance() {
    const args    = [ Alice.info.eth.address, Bob.info.eth.address ]
    const params  = { from: Bob.info.eth.address }

    return this.call('getBalance', args, params)
  }

  withdraw(secret) {
    const args    = [ `0x${secret}`, Alice.info.eth.address, Bob.info.eth.address ]
    const params  = { from: Bob.info.eth.address }

    return this.send('withdraw', args, params)
  }

  getSecret() {
    const args    = [ Alice.info.eth.address, Bob.info.eth.address ]
    const params  = { from: Alice.info.eth.address }

    return this.call('getSecret', args, params)
  }
}


module.exports = new Contract()
