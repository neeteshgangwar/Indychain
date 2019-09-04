const indy = require('indy-sdk')
const util = require('./util')
const colors = require('./colors')

const log = console.log

function logValue() {
    log(colors.CYAN, ...arguments, colors.NONE)
}

async function run() {

    log("Set protocol version 2 to work with Indy Node 1.4")
    await indy.setProtocolVersion(2)

    log('3. Creating new secure wallet')
    const walletName = {"id": "walqet"}
    const walletCredentials = {"key": "wallet_key"}
    await indy.createWallet(walletName, walletCredentials)


    log('4. Open wallet and get handle from libindy')
    const walletHandle = await indy.openWallet(walletName, walletCredentials)



// 5.
     log('5. Generating and storing steward DID and verkey')
     const stewardSeed = '000000000000000000000000Steward1'
     const did = {'seed': stewardSeed}
     const [stewardDid, stewardVerkey] = await indy.createAndStoreMyDid(walletHandle, did)
     logValue('Steward DID: ', stewardDid)
     logValue('Steward Verkey: ', stewardVerkey)
 
     // Now, create a new DID and verkey for a trust anchor, and store it in our wallet as well. Don't use a seed;
     // this DID and its keyas are secure and random. Again, we're not writing to the ledger yet.
 
     // 6.
     log('6. Generating and storing trust anchor DID and verkey')
     const [trustAnchorDid, trustAnchorVerkey] = await indy.createAndStoreMyDid(walletHandle, "{}")
     logValue('Trust anchor DID: ', trustAnchorDid)
     logValue('Trust anchor Verkey: ', trustAnchorVerkey)
}
try {
    run()
} catch (e) {
    log("ERROR occured : e")
}
