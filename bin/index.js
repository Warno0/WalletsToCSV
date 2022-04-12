#!/usr/bin/env node

const yargs = require("yargs");
const { ethers } = require("ethers");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: 'Wallets.csv',
    header: [
      {id: 'Name', title: 'Name'},
      {id: 'Address', title: 'Address'},
      {id: 'PrivateKey', title: 'PrivateKey'},
    ]
  });

const options = yargs
 .usage("Usage: -q <quantity>")
 .option("q", { alias: "quantity", describe: "Number of wallet to generate", type: "int", demandOption: true })
 .argv;


if (options.quantity > 50) {
    throw new Error("Cannot Generate more than 50 wallets")
}if (options.quantity <= 0) {
    throw new Error("Quantity cannot be negative")
}

var Wallets = [];

let walletGeneration = (qt = options.quantity) => {
    for(let i = 0; i < qt; i++){
        let wallet = new ethers.Wallet.createRandom();
        let newWallet = {
            Name: "Wallet# "+(i+1),
            Address: wallet.address,
            PrivateKey: wallet.privateKey
        }
        Wallets.push(newWallet);
    }
    console.log(Wallets);
}

walletGeneration();
csvWriter
  .writeRecords(Wallets)
  .then(()=> console.log('The CSV file was written successfully'));