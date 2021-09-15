const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');
var whois = require('whois')

updateList();

async function updateList() {
const response = await fetch('https://raw.githubusercontent.com/publicsuffix/list/master/public_suffix_list.dat');
const body = await response.text();
const TLDs = body.trim().split("\n").filter(line => !line.startsWith("//") && line !== "");

var contents = "";

for (let TLD of TLDs) {
  whois.lookup(TLD.replace("*.", ""), function(err, data) {
	if (JSON.stringify(data).includes("%ERROR:101")) contents += "\n"+TLD;
  });
}
fs.writeFileSync('invalid', contents);
}
