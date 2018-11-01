
const FlexSDKNode = require('@cybersource/flex-sdk-node');
const { CS_MID, CS_KEY_ID, CS_SHARED_SECRET } = process.env;
const flex = FlexSDKNode({
  mid: CS_MID,
  keyId: CS_KEY_ID,
  sharedSecret: CS_SHARED_SECRET,
  production: false,
});

module.exports = (opts = {}) => {
  const options = Object.assign({}, {
    encryptionType: flex.constants.encryptionType.RsaOaep,
  },
  opts);
  return new Promise((resolve, reject) => {
    flex.createKey(options, function(e, resp, key) {
      if (e) {
        reject(e);
        return;
      }
      // you can now pass this key to your front end client for token creation. Ensure to persist
      // this somewhere so you can verify the signatures on any created tokens later on!
      resolve(key);
    });

  });
}