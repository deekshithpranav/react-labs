const bip39 = require("bip39");
const express = require("express");
const cors = require("cors");
const elliptic = require("elliptic");

const app = express();

// Use the CORS middleware
app.use(cors());

// Define your routes
app.get("/getMnemonics", (req, res) => {
  const mnemonic = bip39.generateMnemonic();
  let list = mnemonic.split(" ");

  const seed = bip39.mnemonicToSeedSync(mnemonic);

  const ec = new elliptic.ec("secp256k1");
  const keyPair = ec.genKeyPair({
    entropy: seed.slice(0, 32),
  });
  const response = {
    privateKey: keyPair.getPrivate("hex"),
    publicKey: keyPair.getPublic("hex"),
    list: list,
  };
  console.log(keyPair.getPrivate("hex"));
  console.log(keyPair.getPublic("hex"));

  console.log(response);
  res.send(response); // Send list as a JSON response
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
