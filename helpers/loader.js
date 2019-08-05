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


module.exports = {
  loader,
  wait,
}
