const eth           = require('./helpers/eth')
const qtum          = require('./helpers/qtum')
const ethContract   = require('./helpers/ethContract')
const qtumContract  = require('./helpers/qtumContract')
const { Bob }       = require('./helpers/participants')


class Loader {

  constructor() {
    this.symbols = [ '\\', '|', '/', '-' ]
  }

  start() {
    let x = 0

    this.timer = setInterval(() => {
      process.stdout.write('\r' + this.symbols[x++])
      x &= 3
    }, 250)
  }

  stop() {
    process.stdout.write('\r')
    clearInterval(this.timer)
  }
}

const loader = new Loader()

const wait = async (promise) => {
  loader.start()

  const result = await promise

  loader.stop()

  return result
}


// We check balance to understand if transaction confirmed and we can continue
const checkBalance = (contract, valueShouldBeZero) =>
  new Promise((resolve, reject) => {
    let attempt = 0

    const checkBalance = () => {
      setTimeout(async () => {
        let value = await contract.getBalance()
        value = Number(value)

        const isSuccess = valueShouldBeZero ? !value : !!value

        if (!isSuccess) {
          console.log(`\rBalance check attempt: ${attempt}`)

          if (attempt > 10) {
            console.log('\rBalance checking Timeout!')

            reject(new Error('timeout'))
          }
          else {
            attempt++
            checkBalance()
          }
        }
        else {
          resolve()
        }
      }, 15000)
    }

    checkBalance()
  })

const swap = async () => {
  try {
    // Alice owns ETH, Bob owns QTUM
    // Alice wants to swap ETH to QTUM

    // Bob sends secret hash to Alice

    // Alice funds ETH Contract using Bob's secret hash
    // Bob has access to ETH Contract
    await wait(ethContract.fund(Bob.info.secretHash))

    // Bob funds QTUM Contract using his secret hash
    // Alice needs secret to access QTUM Contract
    await wait(qtumContract.fund(Bob.info.secretHash))

    await wait(Promise.all([
      checkBalance(ethContract, false),
      checkBalance(qtumContract, false),
    ]))

    // Bob withdraw money from ETH Contract
    // Bob puts secret
    await wait(ethContract.withdraw(Bob.info.secret))

    await wait(checkBalance(ethContract, true))

    // Alice gets secret from ETH Contract
    const secret = await wait(ethContract.getSecret())

    // Alice withdraw money from BTC Contract using Bob's secret
    await wait(qtumContract.withdraw(secret))

    await wait(checkBalance(qtumContract, true))
  }
  catch (err) {
    console.log(err)
  }
}

swap()
