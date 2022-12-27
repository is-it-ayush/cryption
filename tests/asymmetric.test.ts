import { generateRSAOEAPKeyPair, encryptRSAOAEP, decryptRSAOAEP } from "../core/asymmetric";
import { export_asymmetric_keys, fromBufferTo } from "../helpers/utils";

describe("Asymmetric Algorithms Test", () => {

    test("RSA-OAEP Key Generation and Base64 Conversion", async () => {
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

        const encryptedText = await fromBufferTo(encrypted, "base64");
        const decryptedText = await fromBufferTo(decrypted, "utf8");

        expect(encryptedText).toBeDefined();
        expect(decryptedText).toBeDefined();
        expect(decryptedText).toBe(text);
    });
    test("RSA-OAEP Exporting Public and Private Keys to Base64", async () => {
        const keypair = await generateRSAOEAPKeyPair(2048, 'SHA-256', true);
        const exportedKeyPair = await export_asymmetric_keys(keypair);
        expect(exportedKeyPair.publicKey).toBeDefined();
        expect(exportedKeyPair.privateKey).toBeDefined();
    });
});