const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const indy = require('indy-sdk')
const util = require('../util')
const async = require('async')
const Schema = mongoose.Schema;
var poolData = new Schema({

    poolName: {
        type: String
    },
    poolHandle: {
        type: String
    },

    genesisFilePath: {
        type: String
    },   
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('poolData', poolData);

async function init() {
    var obj = {
        poolName: "pool!",

    }
    await indy.setProtocolVersion(2)
    util.getPoolGenesisTxnPath(obj.poolName).then(async (genesisFilePath) => {
        console.log("poolName:", obj.poolName)

        console.log("getPoolGenesisTxnPath,,", genesisFilePath)
        const poolConfig = { 'genesis_txn': genesisFilePath }
       await indy.createPoolLedgerConfig(obj.poolName, poolConfig)

        // console.log('2. Open pool ledger and get handle from libindy')
        const poolHandle = await indy.openPoolLedger(obj.poolName, poolConfig)
        await console.log("pool successfully created ", poolHandle)


        var obj1 = {
            poolName: obj.poolName,
            poolHandle: poolHandle.toString(),
            poolConfig: poolConfig.toString(),
            genesisFilePath: genesisFilePath.toString()
        };
       // console.log("54==========>>>", obj1)
        mongoose.model('poolData', poolData ).create(obj1,async (err, success) => {
            if (err){
              await  console.log("error ", err);
            } 
            else{
              await  console.log("pool successfully created  ", success);
            }
             
        })

    }).catch(err => {
        console.log("pool already exist ")
    })
}
try {
    init()
} catch (e) {
    console.log("ERROR occured : e")
}

