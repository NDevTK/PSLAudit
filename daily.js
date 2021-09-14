var checkDomain = require("check-domain");

checker();

async function checker() {
const response = await fetch('https://raw.githubusercontent.com/publicsuffix/list/master/public_suffix_list.dat');
const body = await response.text();
const TLDs = body.trim().split("\n").filter(line => !line.startsWith("//") && line !== "");

for (let TLD of TLDs) {
  checkDomain({domain: TLD.replace("*.", "")}, result => {
    if (result.isAvailable) console.log(result);
  });
}


}
