import { encryptRSAOAEP, decryptRSAOAEP } from "../core/rsa_oaep";
import { generateRSAOEAPKeyPair } from "../core/generate_keys";
import { export_asymmetric_keys, convertFromTo } from "../helpers/utils";

describe("RSA-OAEP Test", () => {

    test("RSA-OAEP Key Generation and Export To Base64", async () => {
        const keypair = await generateRSAOEAPKeyPair(2048, 'SHA-256', true);
        const exportedKeyPair = await export_asymmetric_keys(keypair);
        expect(exportedKeyPair.publicKey).toBeDefined();
        expect(exportedKeyPair.privateKey).toBeDefined();

    });
    test("RSA-OAEP Encryption and Decryption with Text", async () => {
        const keypair = await generateRSAOEAPKeyPair(2048, 'SHA-256', true);
        const text = "Hello World";

        const encrypted = await encryptRSAOAEP(keypair.publicKey, text);
        const decrypted = await decryptRSAOAEP(keypair.privateKey, encrypted);

        const encryptedText = await convertFromTo(encrypted, "base64");
        const decryptedText = await convertFromTo(decrypted, "utf8");

        expect(encryptedText).toBeDefined();
        expect(decryptedText).toBeDefined();
        expect(decryptedText).toBe(text);
    });
});