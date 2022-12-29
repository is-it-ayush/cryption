import * as crypto from "crypto";

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