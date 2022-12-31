import { encryptRSAOAEP, decryptRSAOAEP } from "../core/rsa_oaep";
import { generate_rsa_oeap_key_pair } from "../core/generate_keys";
import { export_asymmetric_keys, convertFromTo } from "../helpers/utils";

describe("RSA-OAEP Test", () => {

    test("RSA-OAEP Key Generation and Export To Base64", async () => {
        const keypair = await generate_rsa_oeap_key_pair(2048, 'SHA-256', true);
        const exportedKeyPair = await export_asymmetric_keys(keypair, "base64");
        expect(exportedKeyPair.publicKey).toBeDefined();
        expect(exportedKeyPair.privateKey).toBeDefined();

    });
    test("RSA-OAEP Encryption and Decryption with Text", async () => {
        const keypair = await generate_rsa_oeap_key_pair(2048, 'SHA-256', true);
        const text = Buffer.from("Hello World");

        const encrypted = await encryptRSAOAEP(keypair.publicKey, text);
        const decrypted = await decryptRSAOAEP(keypair.privateKey, encrypted);

        const encryptedText = await convertFromTo("base64", encrypted);
        const decryptedText = await convertFromTo("utf8", decrypted);

        expect(encryptedText).toBeDefined();
        expect(decryptedText).toBeDefined();
        expect(decryptedText).toBe(Buffer.from(text).toString('utf-8'));
    });
});