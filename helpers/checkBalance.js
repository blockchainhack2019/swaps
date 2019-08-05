// We check balance to understand if transaction confirmed and we can continue
const checkBalance = (contract, valueShouldBeZero, ...args) =>
  new Promise((resolve, reject) => {
    console.log(`\nChecking ${contract.name} balance`)

    let attempt = 1

    const checkBalance = async () => {
      let value = await contract.getBalance(...args)
      value = Number(value)

      const isSuccess = valueShouldBeZero ? !value : !!value

      if (!isSuccess) {
        console.log(`\rAttempt: ${attempt}`)

        if (attempt > 29) {
          console.log('\rTimeout!')

          reject()
        }
        else {
          attempt++

          setTimeout(() => {
            checkBalance()
          }, 15000)
        }
      }
      else {
        console.log('\rSuccess')

        resolve()
      }
    }

    checkBalance()
  })


module.exports = checkBalance
