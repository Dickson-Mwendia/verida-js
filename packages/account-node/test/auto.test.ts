'use strict'
const assert = require('assert')
import { AutoAccount } from "../src/index"
import { decodeJWT } from 'did-jwt'


const ETH_PRIVATE_KEY = '0xc0da48347b4bcb2cfb08d6b8c26b52b47fd36ca6114974a0104d15fab076f553'
const CERAMIC_URL = 'https://ceramic-clay.3boxlabs.com'
const APPLICATION_NAME = 'Verida Test: DIDJWT'
const DEFAULT_ENDPOINTS = {
    defaultDatabaseServer: {
        type: 'VeridaDatabase',
        endpointUri: 'https://db.testnet.verida.io:5002/'
    },
    defaultMessageServer: {
        type: 'VeridaMessage',
        endpointUri: 'https://db.testnet.verida.io:5002/'
    },
}

const MNEMONIC = 'next awake illegal system analyst border core forum wheat frost hen patch'

describe('Auto account tests', () => {

    describe('Basic tests', function() {
        this.timeout(100000)

        it('verify did-jwt', async function() {
            const account = new AutoAccount(DEFAULT_ENDPOINTS, {
                chain: 'ethr',
                privateKey: ETH_PRIVATE_KEY,
                ceramicUrl: CERAMIC_URL
            })
            const didJwt = await account.createDidJwt(APPLICATION_NAME, {
                hello: 'world'
            })

            const decoded: any = decodeJWT(didJwt)
            const did = await account.did()

            assert.equal(decoded.payload.aud, did, 'Decoded AUD matches')
            assert.equal(decoded.payload.iss, did, 'Decoded ISS matches')
            assert.equal(decoded.payload.data.hello, 'world', 'Decoded data matches')
            assert.equal(decoded.payload.context, APPLICATION_NAME, 'Decoded context matches')
        })

        it('can reopen the same 3id account with the same mnemonic and did', async () => {
            const account1 = new AutoAccount(DEFAULT_ENDPOINTS, {
                chain: '3id',
                privateKey: MNEMONIC,
            })

            const did1 = await account1.did()

            const account2 = new AutoAccount(DEFAULT_ENDPOINTS, {
                chain: '3id',
                privateKey: MNEMONIC,
                options: { did1 },
            })

            const did2 = await account2.did()
            assert.equal(did1, did2, 'both dids match')
        })

    })
})
