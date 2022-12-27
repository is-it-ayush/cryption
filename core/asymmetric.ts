import * as crypto from "crypto";
import { allowedRSAOEAPSizes, allowedRSAOEAPHashes } from "../helpers/constants";

export async function generateRSAOEAPKeyPair(size: number = 2048, hash: string = "SHA-256", extractable: boolean = true) {

    if (!allowedRSAOEAPSizes.includes(size)) {
        throw new Error("The size of the key must be 512, 1024, 2048, 4096 or 8192 bits. You provided size: " + size + " bits.");
    }

    if (!allowedRSAOEAPHashes.includes(hash)) {
        throw new Error("The hash algorithm must be SHA-1, SHA-256, SHA-384 or SHA-512. You provided hash: " + hash + ".");
    }

    const keyPair = await crypto.subtle.generateKey({
        name: "RSA-OAEP",
        modulusLength: size,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 24 bit representation of 65537
        hash: hash
    }, extractable, ["encrypt", "decrypt"]);

    return keyPair;
}

export async function encryptRSAOAEP(key: crypto.webcrypto.CryptoKey, data: string) {

    if (!data || !key) {
        throw new Error("The are missing parameters. The key or data were not found as an argument. ");
    }

    const encrypted = await crypto.subtle.encrypt({
        name: "RSA-OAEP"
    }, key, Buffer.from(data));
    return encrypted;
}

// 
export async function decryptRSAOAEP(key: crypto.webcrypto.CryptoKey, data: ArrayBuffer) {

    if (!data || !key) {
        throw new Error("The are missing parameters. The key or data were not found as an argument. ");
    }

    const decrypted = await crypto.subtle.decrypt({
        name: "RSA-OAEP"
    }, key, data);
    return decrypted;
}