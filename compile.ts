import solc from 'solc';
import fs from 'fs'
import path from 'path'

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf-8");

const input = {
    language: 'Solidity',
    sources: {
      'Inbox.sol': {
        content: source
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };
  
const compiled = JSON.parse(solc.compile(JSON.stringify(input)));

const inbox = compiled.contracts["Inbox.sol"]['Inbox'];
const {
    abi,
    devdoc,
    evm,
    ewasm,
    metadata,
    storageLayout,
    userdoc
} = inbox;

export default {
    abi,
    devdoc,
    evm,
    ewasm,
    metadata,
    storageLayout,
    userdoc
};
