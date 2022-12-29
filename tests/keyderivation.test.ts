import * as crypto from "crypto";
import { convertFromTo } from "../helpers/utils";
import { deriveKeyWithPBKDF2, deriveKeyWithScrypt, deriveKeyWithHKDF } from "../core/key_derivation";

describe("Key Derivation Test", () => {

    describe("PBKDF2", () => {

        test("PBKDF2 Key Derivation: SHA256", async () => {
            const password = "Hello World";
            const salt = crypto.getRandomValues(new Uint8Array(16)).toString();
            const iterations = 10000;
            const keylen = 32;
            const digest = 'sha256';

            const derivedKey = await deriveKeyWithPBKDF2(password, salt, iterations, keylen, digest, 'base64');
            expect(derivedKey).toBeDefined();
        });

        test("PBKDF2 Derivation and ReHash Test", async () => {
            const password = "Hello World";
            const salt = crypto.getRandomValues(new Uint8Array(16)).toString();
            const iterations = 10000;
            const keylen = 32;
            const digest = 'sha256';

            const derivedKey = await deriveKeyWithPBKDF2(password, salt, iterations, keylen, digest, 'base64');
            const rehashedKey = await deriveKeyWithPBKDF2(password, salt, iterations, keylen, digest, 'base64');
            expect(derivedKey).toEqual(rehashedKey);
        });
    });
    describe("Scrypt", () => {
        test("Scrypt Key Derivation", async () => {
            const password = "Hello World";
            const salt = crypto.getRandomValues(new Uint8Array(16)).toString();
            const keylen = 32;

            const derivedKey = await deriveKeyWithScrypt(password, salt, keylen, 'base64');
            expect(derivedKey).toBeDefined();
        });
        test("Scrypt Derivation and ReHash Test", async () => {
            const password = "Hello World";
            const salt = crypto.getRandomValues(new Uint8Array(16)).toString();
            const keylen = 32;

            const derivedKey = await deriveKeyWithScrypt(password, salt, keylen, 'base64');
            const rehashedKey = await deriveKeyWithScrypt(password, salt, keylen, 'base64');
            expect(derivedKey).toEqual(rehashedKey);

        });
    });
    describe("HKDF", () => {
        test("HKDF Key Derivation", async () => {
            const password = "Hello World";
            const salt = crypto.getRandomValues(new Uint8Array(16)).toString();
            const keylen = 32;

            const derivedKey = await deriveKeyWithHKDF(password, salt, keylen, 'base64');
            expect(derivedKey).toBeDefined();
        });
        test("HKDF Derivation and ReHash Test", async () => {
            const password = "Hello World";
            const salt = crypto.getRandomValues(new Uint8Array(16)).toString();
            const keylen = 32;

            const derivedKey = await deriveKeyWithHKDF(password, salt, keylen, 'base64');
            const rehashedKey = await deriveKeyWithHKDF(password, salt, keylen, 'base64');
            expect(derivedKey).toEqual(rehashedKey);
        });
    });
});