import * as crypto from "crypto";

export async function generateRSAOEAPKeyPair(size: number = 2048, hash: string = "SHA-256") {

    const keyPair = await crypto.subtle.generateKey({
        name: "RSA-OAEP",
        modulusLength: size,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 24 bit representation of 65537
        hash: hash
    }, true, ["encrypt", "decrypt"]);

    return keyPair;
}

export async function encryptRSAOAEP(key: crypto.webcrypto.CryptoKey, data: string) {
    const encrypted = await crypto.subtle.encrypt({
        name: "RSA-OAEP"
    }, key, Buffer.from(data));
    return encrypted;
}

// 
export async function decryptRSAOAEP(key: crypto.webcrypto.CryptoKey, data: ArrayBuffer) {
    const decrypted = await crypto.subtle.decrypt({
        name: "RSA-OAEP"
    }, key, data);
    return decrypted;
}