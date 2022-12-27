import { generateAESKey, encryptAES, decryptAES } from "../core/symmetric";
import { export_symmetric_key, fromBufferTo } from "../helpers/utils";
import * as crypto from "crypto";

describe("Symmetric Algorithms Test", () => {

    describe("AES-GCM", () => {

        test("AES-GCM Key Generation and Export To Base64", async () => {
            const key = await generateAESKey(256, true, 'AES-GCM');
            const exportedKey = await export_symmetric_key(key);
            expect(exportedKey).toBeDefined();
        });

        test("AES-GCM Encryption and Decryption with Text", async () => {
            const iv = crypto.getRandomValues(new Uint8Array(96));
            const key = await generateAESKey(256, true, 'AES-GCM');
            const text = "Hello World";

            const encrypted = await encryptAES(key, text, "AES-GCM", iv);
            const decrypted = await decryptAES(key, encrypted, "AES-GCM", iv);

            const encryptedText = await fromBufferTo(encrypted, "base64");
            const decryptedText = await fromBufferTo(decrypted, "utf8");


            expect(encryptedText).toBeDefined();
            expect(decryptedText).toBeDefined();
            expect(decryptedText).toBe(text);
        });
    });
    describe("AES-CBC", () => {

        test("AES-CBC Key Generation and Export To Base64", async () => {
            const key = await generateAESKey(256, true, 'AES-CBC');
            const exportedKey = await export_symmetric_key(key);
            expect(exportedKey).toBeDefined();

        });

        test("AES-CBC Encryption and Decryption with Text", async () => {
            const iv = crypto.getRandomValues(new Uint8Array(16));
            const key = await generateAESKey(256, true, 'AES-CBC');
            const text = "Hello World";

            const encrypted = await encryptAES(key, text, "AES-CBC", iv);
            const decrypted = await decryptAES(key, encrypted, "AES-CBC", iv);

            const encryptedText = await fromBufferTo(encrypted, "base64");
            const decryptedText = await fromBufferTo(decrypted, "utf8");

            expect(encryptedText).toBeDefined();
            expect(decryptedText).toBeDefined();
            expect(decryptedText).toBe(text);

        });
    });
    describe("AES-CTR", () => {

        test("AES-CTR Key Generation and Export To Base64", async () => {
            const key = await generateAESKey(256, true, 'AES-CTR');
            const exportedKey = await export_symmetric_key(key);
            expect(exportedKey).toBeDefined();
        });

        test("AES-CTR Encryption and Decryption with Text", async () => {
            const counter = crypto.getRandomValues(new Uint8Array(16));
            const key = await generateAESKey(256, true, 'AES-CTR');
            const text = "Hello World";

            const encrypted = await encryptAES(key, text, "AES-CTR", undefined, counter);
            const decrypted = await decryptAES(key, encrypted, "AES-CTR", undefined, counter);

            const encryptedText = await fromBufferTo(encrypted, "base64");
            const decryptedText = await fromBufferTo(decrypted, "utf8");

            expect(encryptedText).toBeDefined();
            expect(decryptedText).toBeDefined();
            expect(decryptedText).toBe(text);

        });
    });
});