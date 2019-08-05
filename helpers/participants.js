const eth   = require('./eth')
const btc   = require('./btc')
const qtum  = require('./qtum')


const Alice = {
  info: {
    eth: {
      privateKey: '0x2c4c0e4b0214330cf4b5fe925f02d7e49d007c3143ca95f45ebb26bf3416b137',
      address: '0x0304908486A72648e9C9E05A4571e7c19956f281',
    },
    btc: {
      privateKey: 'cViG8Fevr8KBxTRVwJAGbucgjDSiyG8akDLL2CowKgxiVTte4d47',
      publicKey: '02412f646f5e24debbb329603468cdbe08deb15c7f7e0e2fd8ec10ed45e184d53b',
      address: 'mhJrrw8Wz5rQ1Fz9AYMJbc13NA8wms7caA',
    },
    qtum: {
      privateKey: 'cW9KB36SktLwwvg3juBtzEPcPf3GJ7brzhXC54LAGgdKetm3ZNbV',
      address: 'qfJp4AaaXkB2Te9jsaBsCiUjDeQi7KCLU7',
    },
    secret: 'c9927ac3540f26c91cb29a89d49a529e12159a300033073e287c866bbc02ef0b',
    secretHash: '2a77662276d67e51e8241ffd249ed5cb0cec4550',
  },
  accounts: {},
}

const Bob = {
  info: {
    eth: {
      privateKey: '0x54e27bcace29e9cb9c87f94422bb4ef7c157ed333513c6f852c8d8c89bcaaee3',
      address: '0xC021700eD636Ebb8EeE2717c8C7eDb636A0F5d53',
    },
    btc: {
      privateKey: 'cTrzYzaRQHEaRTLoBLdGGPdKuRYoff6NmsMv3SSkxDjckMsFhECu',
      publicKey: '0260bff24fc6bc675e34cd476f830f2f188e9e176e4bc5fbbfaad2f93f6be95242',
      address: 'mvpPJSAVF9og2wKkKcNnrMaMBRrxv5iwsy',
    },
    qtum: {
      privateKey: 'cUBb27fQ5Jq5rWVpvZASeR4mCMCfHVqWWCY3Wz6NkLr7qVxG6tyc',
      address: 'qJBTJdMK7D2pqzNpkz41T663iR4ZaeMKXn',
    },
  },
  accounts: {},
}

Alice.accounts.eth   = eth.restoreAccount(Alice.info.eth.privateKey)
Alice.accounts.btc   = btc.restoreAccount(Alice.info.btc.privateKey)
Alice.accounts.qtum  = qtum.restoreWallet(Alice.info.qtum.privateKey)

Bob.accounts.eth     = eth.restoreAccount(Bob.info.eth.privateKey)
Bob.accounts.btc     = btc.restoreAccount(Bob.info.btc.privateKey)
Bob.accounts.qtum    = qtum.restoreWallet(Bob.info.qtum.privateKey)


module.exports = {
  Alice,
  Bob,
}
