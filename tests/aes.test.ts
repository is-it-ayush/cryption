import { generate_aes_key } from "../core/generate_keys";
import { encryptAES, decryptAES } from "../core/aes";
import { export_symmetric_key, convertFromTo } from "../helpers/utils";
import * as crypto from "crypto";

describe("AES Test: All Supported", () => {

    describe("AES-GCM", () => {

        test("AES-GCM Key Generation and Export To Base64", async () => {
            const key = await generate_aes_key(256, true, 'AES-GCM');
            const exportedKey = await export_symmetric_key(key);
            expect(exportedKey).toBeDefined();
        });

        test("AES-GCM Encryption and Decryption with Text", async () => {
            const iv = crypto.getRandomValues(new Uint8Array(96));
            const key = await generate_aes_key(256, true, 'AES-GCM');
            const text = Buffer.from("Hello World");

            const encrypted = await encryptAES(key, text, "AES-GCM", iv);
            const decrypted = await decryptAES(key, encrypted, "AES-GCM", iv);

            const encryptedText = await convertFromTo(encrypted, "base64");
            const decryptedText = await convertFromTo(decrypted, "utf8");


            expect(encryptedText).toBeDefined();
            expect(decryptedText).toBeDefined();
            expect(decryptedText).toBe(text.toString('utf-8'));
        });
    });
    describe("AES-CBC", () => {

        test("AES-CBC Key Generation and Export To Base64", async () => {
            const key = await generate_aes_key(256, true, 'AES-CBC');
            const exportedKey = await export_symmetric_key(key);
            expect(exportedKey).toBeDefined();

        });

        test("AES-CBC Encryption and Decryption with Text", async () => {
            const iv = crypto.getRandomValues(new Uint8Array(16));
            const key = await generate_aes_key(256, true, 'AES-CBC');
            const text = Buffer.from("Hello World");

            const encrypted = await encryptAES(key, text, "AES-CBC", iv);
            const decrypted = await decryptAES(key, encrypted, "AES-CBC", iv);

            const encryptedText = await convertFromTo(encrypted, "base64");
            const decryptedText = await convertFromTo(decrypted, "utf8");

            expect(encryptedText).toBeDefined();
            expect(decryptedText).toBeDefined();
            expect(decryptedText).toBe(text.toString('utf-8'));

        });
    });
    describe("AES-CTR", () => {

        test("AES-CTR Key Generation and Export To Base64", async () => {
            const key = await generate_aes_key(256, true, 'AES-CTR');
            const exportedKey = await export_symmetric_key(key);
            expect(exportedKey).toBeDefined();
        });

        test("AES-CTR Encryption and Decryption with Text", async () => {
            const counter = crypto.getRandomValues(new Uint8Array(16));
            const key = await generate_aes_key(256, true, 'AES-CTR');
            const text = Buffer.from("Hello World");

            const encrypted = await encryptAES(key, text, "AES-CTR", undefined, counter);
            const decrypted = await decryptAES(key, encrypted, "AES-CTR", undefined, counter);

            const encryptedText = await convertFromTo(encrypted, "base64");
            const decryptedText = await convertFromTo(decrypted, "utf8");

            expect(encryptedText).toBeDefined();
            expect(decryptedText).toBeDefined();
            expect(decryptedText).toBe(text.toString('utf-8'));
        });
    });
});