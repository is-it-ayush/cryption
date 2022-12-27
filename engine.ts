
import { generateRSAOEAPKeyPair, encryptRSAOAEP, decryptRSAOAEP } from "./core/asm_key_enc";
import { extractKeysToBase64, fromBufferTo } from "./helpers/utils";

async function main() {
    const keypair = await generateRSAOEAPKeyPair(2048, 'SHA-256', true);

    // const text = "Hello World";
    // const encrypted = await encryptRSAOAEP(keypair.publicKey, text);
    // const decrypted = await decryptRSAOAEP(keypair.privateKey, encrypted);
    // const encryptedText = await fromBufferTo(encrypted, "base64");
    // const decryptedText = await fromBufferTo(decrypted, "utf8");
    // console.log(`Testing RSA-OAEP encryption and decryption with text: ${text}`)
    // console.log(`Encrypted: ${encryptedText} | Decrypted: ${decryptedText}`);
    // console.log('------------------------------------');

    // Export Current Key Pair.
    const exportedKeyPair = await extractKeysToBase64(keypair);

    console.log(`Exported Public Key: ${exportedKeyPair.publicKey}`);
    console.log(`Exported Private Key: ${exportedKeyPair.privateKey}`);
}

main();
