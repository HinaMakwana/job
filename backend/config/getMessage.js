
const path = require("path");
module.exports.getMessage = function (key, lang) {
    console.log('dd',lang);
  let localeFile = path.join(__dirname, "locales", `${lang}.json`);
  console.log('sd',localeFile);
  let msgs = require(localeFile);
  return msgs[key];
};