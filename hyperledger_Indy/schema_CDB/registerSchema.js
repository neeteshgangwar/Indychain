const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const indy = require('indy-sdk')
var mongoosePaginate = require('mongoose-paginate');
const util = require('../util')
const async= require('async')
const Schema = mongoose.Schema;
let hyperSchema = new Schema({

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },

    email: {
        type: String
    },
    userName: {
        type: String
    },
    clientDid: {
        type: String
    },
    clientVerkey: {
        type: String
    },
    walletName: {
        type: String
    },
    walletCredentials: {
        type: String
    },
    walletHandle: {
        type: String
    },
    stewardDid:{
        type: String
    },
    stewardVerkey:{
        type: String
    },
    trustAnchorDid:{
        type: String
    },
    trustAnchorVerkey:{
        type: String
    }

    
},
    {
        timestamps: true
    }
);
hyperSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('hyperSchema', hyperSchema);
// console.log("Set...... 1")

//   async function init () {    
//     var obj = {
//         poolName: "pool1",      

//     }
//     console.log("poolName:==",obj.poolName)
//     await indy.setProtocolVersion(2)

//     //Step 2 code goes here.
//  //   console.log('1. Creates a new local pool ledger configuration that is used later when connecting to ledger.')
//     //const poolName = 'pool==--'
//     util.getPoolGenesisTxnPath(obj.poolName,).then(async(genesisFilePath)=>{
//         console.log("getPoolGenesisTxnPath,,", genesisFilePath )        
//             const poolConfig = { 'genesis_txn': genesisFilePath }
//             await indy.createPoolLedgerConfig(obj.poolName, poolConfig)
    
//            // console.log('2. Open pool ledger and get handle from libindy')
//             const poolHandle = await indy.openPoolLedger(obj.poolName, poolConfig)
//             console.log("pool successfully created ",poolHandle )
       
//     }).catch(err=>{
//         console.log("pool already exist ", )
//     })       
// }
// try {
//     init()
// } catch (e) {
//     console.log("ERROR occured : e")
// }

