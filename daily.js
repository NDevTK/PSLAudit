const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const { Resolver } = require('dns').promises;
const resolver = new Resolver();
resolver.setServers(['1.1.1.1', '8.8.8.8']);

const response = await fetch('https://raw.githubusercontent.com/publicsuffix/list/master/public_suffix_list.dat');
const body = await response.text();
const TLDs = body.trim().split("\n").filter(line => !line.startsWith("//") && line !== "");

var newList = [];

for (let TLD of TLDs) {
  try {
  let txt = await resolver.resolveTxt("_psl."+TLD);
  newList.push(TLD);
  } catch {
    console.log("ERROR: "+tld);
  } 
}

console.log(newList);
