const indy = require('indy-sdk')
const util = require('../util')
//const colors = require('../colors')
const log = console.log

const async = require('async')

module.exports = {

    generateDid: async function (req, res) {
        if (!req.body.walletName || !req.body.walletCredentials) {
            res.send({ responseCode: 409, responseMessage: "Perameter missing" })

        } else {
            // walletName = req.body.walletName  //"id"
            // walletCredentials = req.body.walletCredentials //"key"



            log("Set protocol version 2 to work with Indy Node 1.4")
            await indy.setProtocolVersion(2)

            //Step 2 code goes here.
            log('1. Creates a new local pool ledger configuration that is used later when connecting to ledger.')
            const poolName = 'pool=-'
            const genesisFilePath = await util.getPoolGenesisTxnPath(poolName)
            const poolConfig = { 'genesis_txn': genesisFilePath }
            await indy.createPoolLedgerConfig(poolName, poolConfig)

            2.
            log('2. Open pool ledger and get handle from libindy')
            const poolHandle = await indy.openPoolLedger(poolName, poolConfig)


            console.log('3. Creating new secure wallet')

            const walletName = { "id": "gs" }
            const walletCredentials = { "key": "wallet_key"}
            console.log("jhjhhhhh", walletName, ",,,,", walletCredentials)
            const wallet = await indy.createWallet(walletName, walletCredentials)

            console.log('4. Open wallet and get handle from libindy', wallet)
            const walletHandle = await indy.openWallet(walletName, walletCredentials)



            // 5.
            console.log('5. Generating and storing steward DID and verkey')
            const stewardSeed = '000000000000000000000000Steward1'
            const did = { 'seed': stewardSeed }
            const [stewardDid, stewardVerkey] = await indy.createAndStoreMyDid(walletHandle, did)
            console.log('Steward DID: ', stewardDid)
            console.log('Steward Verkey: ', stewardVerkey)

            // Now, create a new DID and verkey for a trust anchor, and store it in our wallet as well. Don't use a seed;
            // this DID and its keyas are secure and random. Again, we're not writing to the ledger yet.

            // 6.
            console.log('6. Generating and storing trust anchor DID and verkey')
            const [trustAnchorDid, trustAnchorVerkey] = await indy.createAndStoreMyDid(walletHandle, "{}")

            console.log('Trust anchor DID: ', trustAnchorDid)
            console.log('Trust anchor Verkey: ', trustAnchorVerkey)


            console.log('9. Generating and storing DID and verkey representing a Client that wants to obtain Trust Anchor Verkey')
            const [clientDid, clientVerkey] = await indy.createAndStoreMyDid(walletHandle, "{}")
            console.log('Client DID: ', clientDid)
            console.log('Client Verkey: ', clientVerkey)

            var obj = {
                walletName:walletName ,
                stewardDid: stewardDid,
                stewardVerkey: stewardVerkey,
                trustAnchorDid: trustAnchorDid,
                trustAnchorVerkey: trustAnchorVerkey,
                clientDid: clientDid,
                clientVerkey: clientVerkey
            }
            res.send({ responseCode: 200, responseMessage: obj })
        }


    },
    registration: async (req, res) => {
        if (!req.body.email || !req.body.userName || !req.body.firstName || !req.body.lastName) {
            res.send({ responseCode: 409, responseMessage: "Perameter missing" })

        } else {
            var obj = {
                email: req.body.email,
                userName: req.body.userName,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
               

            }
            console.log('3. Creating new secure wallet')

            const walletName = { "id": "g2wspd" }
            const walletCredentials = { "key": "jbdfj" }
            // console.log("jhjhhhhh",walletName,",,,,",walletCredentials)
            const wallet = await indy.createWallet(walletName, walletCredentials)

            console.log('4. Open wallet and get handle from libindy', wallet)
            const walletHandle = await indy.openWallet(walletName, walletCredentials)


            console.log('5. Generating and storing steward DID and verkey')
            const stewardSeed = '000000000000000000000000Steward1'
            const did = { 'seed': stewardSeed }
            const [stewardDid, stewardVerkey] = await indy.createAndStoreMyDid(walletHandle, did)
            console.log('Steward DID: ', stewardDid)
            console.log('Steward Verkey: ', stewardVerkey)

            // Now, create a new DID and verkey for a trust anchor, and store it in our wallet as well. Don't use a seed;
            // this DID and its keyas are secure and random. Again, we're not writing to the ledger yet.

            // 6.
            console.log('6. Generating and storing trust anchor DID and verkey')
            const [trustAnchorDid, trustAnchorVerkey] = await indy.createAndStoreMyDid(walletHandle, "{}")

            console.log('Trust anchor DID: ', trustAnchorDid)
            console.log('Trust anchor Verkey: ', trustAnchorVerkey)


            //console.log('9. Generating and storing DID and verkey representing a Client that wants to obtain Trust Anchor Verkey')
            schema = {
                'name': 'mobiloitte',
                'version': '1.0',
                'attributes': ["email", "userName", "firstName", "lastName"]
                
            }


    
    
            
            const [clientDid, clientVerkey] = await indy.createAndStoreMyDid(walletHandle, "{}")

            console.log('Client DID: ', clientDid)
            console.log('Client Verkey: ', clientVerkey)
            const [issuer_schema_id, issuer_schema_json] = await indy.issuerCreateSchema(clientDid, schema['name'],
                schema['version'],
                schema['attributes']
            )
            console.log('Schema: ', issuer_schema_id)
            console.log("issuer_schema_json=", issuer_schema_json)
            res.send({
                responseCode: 200, responseMessage: data = {
                    "clientDid": clientDid,
                    "clientVerkey": clientVerkey,
                    "issuer_schema_id": issuer_schema_id,
                    "Schema": issuer_schema_json,
                    "walletName":walletName,
                    "walletCredentials":walletCredentials,
                    
                }
            })


            log("7. Issuer creates Credential for received Cred Request")
            const credValues = {
                "sex": {"raw": "male", "encoded": "5944657099558967239210949258394887428692050081607692519917050011144233115103"},
                "name": {"raw": "Alex", "encoded": "1139481716457488690172217916278103335"},
                "height": {"raw": "175", "encoded": "175"},
                "age": {"raw": "28", "encoded": "28"}
            }
            const tailsWriterConfig = {'base_dir': util.getPathToIndyClientHome() + "/tails", 'uri_pattern': ''}
            const blobStorageReaderHandle = await indy.openBlobStorageReader('default', tailsWriterConfig)
            const [cred] = await indy.issuerCreateCredential( credOffer, credReq, credValues, undefined, blobStorageReaderHandle)
        
            // 8.
            log("8. Prover processes and stores received Credential")
            await indy.proverStoreCredential(proverWalletHandle, undefined, credReqMetadata, cred, credDef,undefined)
        
            // Step 3 code goes here.
            log("9. Prover gets Credentials for Proof Request")
            const proofRequest = {
                'nonce': '123432421212',
                'name': 'proof_req_1',
                'version': '0.1',
                'requested_attributes': {
                    'attr1_referent': {
                        'name': 'name',
                        'restrictions': [{
                            'cred_def_id': credDefId
                            /*
                            'issuer_did': issuerDid,
                            'schema_key': schemaKey
                            */
                        }]
                    }
                },
                'requested_predicates': {
                    'predicate1_referent': {
                        'name': 'age',
                        'p_type': '>=',
                        'p_value': 18,
                        'restrictions': [{'issuer_did': issuerDid}]
                    }
                }
            }

            const credsForProofRequest = await indy.proverGetCredentialsForProofReq(proverWalletHandle, proofRequest)

            log("10. Prover creates Proof for Proof Request")
            const credForAttr1 = credsForProofRequest["attrs"]["attr1_referent"]
            const referent = credForAttr1[0].cred_info.referent
            const requestedCredentials = {
                "self_attested_attributes": {},
                "requested_attributes": {
                    "attr1_referent": {
                        cred_id: referent,
                        revealed: true
                    }
                },
                "requested_predicates": {
                    "predicate1_referent": {
                        cred_id: referent
                    }
                }
            }
            const schemas = {
                [schemaId]: schema
            }
            const credentialDefs = {
                [credDefId]: credDef
            }
            const revocRegs = {}
            const revRegs = {}
            const proof = await indy.proverCreateProof(proverWalletHandle, proofRequest, requestedCredentials, proverMasterSecret, schemas, credentialDefs, revocRegs)
        
            // Step 5 code goes here.
            log("11. Verifier is verifying proof from Prover")
            const verified = await indy.verifierVerifyProof(proofRequest, proof, schemas, credentialDefs, revocRegs, revRegs)
        
            logValue("Proof :")
            logValue(". Name="+proof['requested_proof']['revealed_attrs']['attr1_referent']['raw'])
            logValue(". Verified="+verified)
        
        
        }



    }
}








// console.log('3. Creating new secure wallet', req.body.walletName, req.body.walletCredentials)

//             const walletName = { "id": req.body.walletName }
//             const walletCredentials = { "key": req.body.walletCredentials }
//             console.log("jhjhhhhh", walletName, ",,,,", walletCredentials)
//             indy.createWallet(walletName, walletCredentials).then(wallet => {
//                 console.log('4. Open wallet and get handle from libindy', wallet)

//                 indy.openWallet(walletName, walletCredentials).then(walletHandle => {
//                     console.log('Steward DID: ', stewardDid)
//                     console.log('Steward Verkey: ', stewardVerkey)
//                    var stewardDid=
//                     console.log('wallethandle......', walletHandle)

//                     console.log('5. Generating and storing steward DID and verkey')
//                     const stewardSeed = '000000000000000000000000Steward1'
//                     const did = { 'seed': stewardSeed }
//                     indy.createAndStoreMyDid(walletHandle, did).then(data=>{
//                         console.log('data.........: ', data)

//                         console.log('6. Generating and storing trust anchor DID and verkey')
//                         indy.createAndStoreMyDid(walletHandle, "{}").then(data=>{

//                         console.log('Trust anchor DID: ',data[0])
//                         console.log('Trust anchor Verkey: ',data[1])
//                         var obj = {
//                             walletName: req.body.walletName,
//                             stewardDid: stewardDid,
//                             stewardVerkey: stewardVerkey,
//                             trustAnchorDid: data[0],
//                             trustAnchorVerkey: data[1]
//                         }
//                         res.send({ responseCode: 200, responseMessage: obj })

//                         })

//                     }).catch(err=>{
//                         console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrr1', err)
//                     })

//                 }).catch(err => {
//                     console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrr2', err)
//                 })
//             }).catch(err => {
//                 console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrr3', err)
//                 res.send({ responseCode: 400, responseMessage: err })
//             })