const eth   = require('./eth')
const qtum  = require('./qtum')


const Alice = { // ETH
  info: {
    ethPrivateKey: '0x2c4c0e4b0214330cf4b5fe925f02d7e49d007c3143ca95f45ebb26bf3416b137',
    qtumPrivateKey: 'cW9KB36SktLwwvg3juBtzEPcPf3GJ7brzhXC54LAGgdKetm3ZNbV',

    ethAddress: '0x0304908486A72648e9C9E05A4571e7c19956f281',
    qtumAddress: 'qfJp4AaaXkB2Te9jsaBsCiUjDeQi7KCLU7',
  },
}

const Bob = { // QTUM
  info: {
    ethPrivateKey: '0x54e27bcace29e9cb9c87f94422bb4ef7c157ed333513c6f852c8d8c89bcaaee3',
    qtumPrivateKey: 'cUBb27fQ5Jq5rWVpvZASeR4mCMCfHVqWWCY3Wz6NkLr7qVxG6tyc',

    ethAddress: '0xC021700eD636Ebb8EeE2717c8C7eDb636A0F5d53',
    qtumAddress: 'qJBTJdMK7D2pqzNpkz41T663iR4ZaeMKXn',

    secret: 'c9927ac3540f26c91cb29a89d49a529e12159a300033073e287c866bbc02ef0b',
    secretHash: '2a77662276d67e51e8241ffd249ed5cb0cec4550',
  },
}

Alice.eth   = eth.restoreAccount(Alice.info.ethPrivateKey)
Alice.qtum  = qtum.restoreWallet(Alice.info.qtumPrivateKey)
Bob.eth     = eth.restoreAccount(Bob.info.ethPrivateKey)
Bob.qtum    = qtum.restoreWallet(Bob.info.qtumPrivateKey)


exports.Alice = Alice
exports.Bob = Bob
