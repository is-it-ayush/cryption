import * as crypto from "crypto";
import { decryptAES, encryptAES, generateAESKey } from "./core/symmetric";
import { export_asymmetric_keys, fromBufferTo } from "./helpers/utils";

async function main() {

    // Asymmetric Test: AES Encryption and Decryption with Text & export Key Pair.

    const key = await generateAESKey(256, true, 'AES-GCM');
    const key2 = await generateAESKey(256, true, 'AES-CBC');
    const key3 = await generateAESKey(256, true, 'AES-CTR');

    // Required Data For Encryption. 
    const text = "Hi, You are awesome! :D. I hope my secret message is safe.";
    const iv = crypto.getRandomValues(new Uint8Array(96)); // 12 bytes for AES-GCM. Max IV length for GCM in Unit8Array is 200 bytes.
    const iv2 = crypto.getRandomValues(new Uint8Array(16)); // 16 bytes for AES-CBC
    const counter = crypto.getRandomValues(new Uint8Array(16)); // 16 bytes for AES-CTR

    // Encrypting AES-GCM
    const encrypted = await encryptAES(key, text, 'AES-GCM', iv);
    const encryptedText = await fromBufferTo(encrypted, "base64");

    // Encrypting AES-CBC
    const encrypted2 = await encryptAES(key2, text, 'AES-CBC', iv2);
    const encryptedText2 = await fromBufferTo(encrypted2, "base64");

    // Encrypting AES-CTR
    const encrypted3 = await encryptAES(key3, text, 'AES-CTR', undefined, counter);
    const encryptedText3 = await fromBufferTo(encrypted3, "base64");

    // Decrypting AES-GCM
    const decrypted = await decryptAES(key, encrypted, 'AES-GCM', iv);
    const decryptedText = await fromBufferTo(decrypted, "utf8");

    // Decrypting AES-CBC
    const decrypted2 = await decryptAES(key2, encrypted2, 'AES-CBC', iv2);
    const decryptedText2 = await fromBufferTo(decrypted2, "utf8");

    // Decrypting AES-CTR
    const decrypted3 = await decryptAES(key3, encrypted3, 'AES-CTR', undefined, counter);
    const decryptedText3 = await fromBufferTo(decrypted3, "utf8");

    // Debug
    console.log(`Testing AES-GCM encryption and decryption with text: ${text}`)
    console.log(`Encrypted | AES-GCM: ${encryptedText}`);
    console.log(`Decrypted | AES-GCM: ${decryptedText}`);

    console.log(`Testing AES-CBC encryption and decryption with text: ${text}`)
    console.log(`Encrypted | AES-CBC: ${encryptedText2}`);
    console.log(`Decrypted | AES-CBC: ${decryptedText2}`);

    console.log(`Testing AES-CTR encryption and decryption with text: ${text}`)
    console.log(`Encrypted | AES-CTR: ${encryptedText3}`);
    console.log(`Decrypted | AES-CTR: ${decryptedText3}`);
}

main();
