const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var whois = require('whois')

checker();

async function checker() {
const response = await fetch('https://raw.githubusercontent.com/publicsuffix/list/master/public_suffix_list.dat');
const body = await response.text();
const TLDs = body.trim().split("\n").filter(line => !line.startsWith("//") && line !== "");

for (let TLD of TLDs) {
  whois.lookup(TLD.replace("*.", ""), function(err, data) {
	console.log(data)
  });
}


}
