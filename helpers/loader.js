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

const wait = (promise) =>
  new Promise(async (resolve, reject) => {
    loader.start()

    try {
      const result = await promise

      resolve(result)
    }
    catch (err) {
      reject()
    }
    finally {
      loader.stop()
    }
  })


module.exports = {
  loader,
  wait,
}
