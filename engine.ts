import { generateRSAOEAPKeyPair, encryptRSAOAEP, decryptRSAOAEP } from "./core/asm_key_enc";
const RSA_TYPES = ["RSASSA-PKCS1-v1_5", "RSA-PSS", "RSA-OAEP"];

async function main() {
    const keypair = await generateRSAOEAPKeyPair();
    const text = "Hello World";

    const encrypted = await encryptRSAOAEP(keypair.publicKey, text);
    const decrypted = await decryptRSAOAEP(keypair.privateKey, encrypted);

    const encryptedText = Buffer.from(encrypted).toString("base64");
    const decryptedText = Buffer.from(decrypted).toString("utf-8");

    console.log(`Testing RSA-OAEP encryption and decryption with text: ${text}`)
    console.log(`Encrypted: ${encryptedText} | Decrypted: ${decryptedText}`);
}

main();
