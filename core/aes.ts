import * as crypto from "crypto";
import { SymmetricAlgorithms } from "../helpers/utils.d";

/**
 * A function to encrypt data with AES.
 * @param key The key to use for the encryption. You can use a secret symmetric key.
 * @param data The data to encrypt. It must be a Buffer.
 * @param algorithm The algorithm to use. Default is AES-CBC. You can use AES-CBC, AES-CTR, AES-GCM.
 * @param iv If the algorithm is AES-CBC (default) or AES-GCM, you must provide an IV.
 * @param counter If the algorithm is AES-CTR, you must provide a counter.
 * @returns A Promise with the encrypted data.
 */
export async function encrypt_aes(key: crypto.webcrypto.CryptoKey, data: Buffer, algorithm: SymmetricAlgorithms = "AES-CBC", iv?: ArrayBuffer, counter?: ArrayBuffer) {

    // Validation of the parameters
    if (!key || !data) {
        throw new Error("You must provide a key and data to encrypt. There are missing parameters.");
    }

    if (!iv && (algorithm === "AES-CBC" || algorithm === "AES-GCM")) {
        throw new Error("You must provide an IV for the " + algorithm + " algorithm.");
    }
    else if (!counter && algorithm === "AES-CTR") {
        throw new Error("You must provide a counter for the " + algorithm + " algorithm.");
    }

    // Do the encryption based on the algorithm and the parameters
    let encrypted: ArrayBuffer;
    if (iv) {
        encrypted = await crypto.subtle.encrypt({
            name: algorithm,
            iv: iv,
        }, key, data);
    }
    else if (counter) {
        encrypted = await crypto.subtle.encrypt({
            name: algorithm,
            counter: counter,
            length: 128
        }, key, data);
    } else {
        // Ideally, this should never happen because of the validation above. Still, it's here just in case.
        throw new Error("You must provide an IV or a counter for the " + algorithm + " algorithm.");
    }

    return encrypted;
}

/**
 * A function to decrypt data with AES.
 * @param key The key to use for the decryption. You must use the same secret key that was used to encrypt the data.
 * @param data The data to decrypt. It must be an ArrayBuffer.
 * @param algorithm The algorithm to use. Default is AES-CBC. You can use AES-CBC, AES-CTR, AES-GCM.
 * @param iv If the algorithm is AES-CBC (default) or AES-GCM, you must provide an IV.
 * @param counter If the algorithm is AES-CTR, you must provide a counter.
 * @returns A Promise with the decrypted data.
 */
export async function decrypt_aes(key: crypto.webcrypto.CryptoKey, data: ArrayBuffer, algorithm: SymmetricAlgorithms = "AES-CBC", iv?: ArrayBuffer, counter?: ArrayBuffer) {

    // Validation of the parameters
    if (!key || !data) {
        throw new Error("You must provide a key and data to decrypt. There are missing parameters.");
    }

    // Validation Conditions
    if (!iv && (algorithm === "AES-CBC" || algorithm === "AES-GCM")) {
        throw new Error("You must provide an IV for the " + algorithm + " algorithm.");
    }
    else if (!counter && algorithm === "AES-CTR") {
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