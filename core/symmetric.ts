import * as crypto from "crypto";
import { SymmetricAlgorithms } from "../helpers/utils.d";

export async function generateAESKey(size: number = 256, extractable: boolean = true, algorithm: SymmetricAlgorithms) {

    if (size !== 128 && size !== 192 && size !== 256) {
        throw new Error("The size of the key must be 128, 192 or 256 bits. You provided size: " + size + " bits.");
    }
    const key = await crypto.subtle.generateKey({
        name: algorithm,
        length: size,
    }, extractable, ["encrypt", "decrypt"]);

    return key;
}

export async function encryptAES(key: crypto.webcrypto.CryptoKey, data: string, algorithm: SymmetricAlgorithms, iv?: ArrayBuffer, counter?: ArrayBuffer) {

    // Validation of the parameters
    if (!key || !data || !algorithm) {
        throw new Error("You must provide a key and data to encrypt. There are missing parameters.");
    }

    if (!iv && (algorithm === "AES-CBC" || algorithm === "AES-GCM")) {
        throw new Error("You must provide an IV for the " + algorithm + " algorithm.");
    }
    if (!counter && algorithm === "AES-CTR") {
        throw new Error("You must provide a counter for the " + algorithm + " algorithm.");
    }

    // Do the encryption based on the algorithm and the parameters
    let encrypted: ArrayBuffer;
    if (iv) {
        encrypted = await crypto.subtle.encrypt({
            name: algorithm,
            iv: iv,
        }, key, Buffer.from(data));
    }
    else if (counter) {
        encrypted = await crypto.subtle.encrypt({
            name: algorithm,
            counter: counter,
            length: 128
        }, key, Buffer.from(data));
    } else {
        // Ideally, this should never happen because of the validation above. Still, it's here just in case.
        throw new Error("You must provide an IV or a counter for the " + algorithm + " algorithm.");
    }

    return encrypted;
}

export async function decryptAES(key: crypto.webcrypto.CryptoKey, data: ArrayBuffer, algorithm: SymmetricAlgorithms, iv?: ArrayBuffer, counter?: ArrayBuffer) {

    // Validation of the parameters
    if (!key || !data || !algorithm) {
        throw new Error("You must provide a key and data to decrypt. There are missing parameters.");
    }

    if (!iv && (algorithm === "AES-CBC" || algorithm === "AES-GCM")) {
        throw new Error("You must provide an IV for the " + algorithm + " algorithm.");
    }
    if (!counter && algorithm === "AES-CTR") {
        throw new Error("You must provide a counter for the " + algorithm + " algorithm.");
    }


    // Do the decryption based on the algorithm and the parameters
    let decrypted: ArrayBuffer;
    if (iv) {
        decrypted = await crypto.subtle.decrypt({
            name: algorithm,
            iv: iv,
        }, key, data);
    }
    else {
        decrypted = await crypto.subtle.decrypt({
            name: algorithm,
            counter: counter,
            length: 128
        }, key, data);
    }

    return decrypted;
}