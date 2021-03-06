const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const whois = (...args) => import('whois-api').then(({default: whois}) => whois(...args));
const fs = require('fs');

updateList();

async function updateList() {
const response = await fetch('https://raw.githubusercontent.com/publicsuffix/list/master/public_suffix_list.dat');
const body = await response.text();
const TLDs = body.trim().split("\n").filter(line => !line.startsWith("//") && line !== "");

var contents = "";

for (let TLD of TLDs) {
  whois.lookup(TLD.replace("*.", ""), function(err, data) {
	if (err) contents += "\n"+TLD;
  });
}
fs.writeFileSync('invalid', contents);
}
