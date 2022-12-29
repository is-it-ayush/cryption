import * as crypto from 'crypto';
import { SymmetricAlgorithms } from "../helpers/utils.d";
import { allowedRSAOEAPSizes, allowedRSAOEAPHashes } from "../helpers/constants";


/**
 * A function to return a symmetric key with the given size.
 * @param size The size of the key. Default is 256 bits. You can use 128, 192 or 256 bits.
 * @param extractable A boolean to set the key as extractable or not. Default is true.
 * @param algorithm The algorithm to use. Default is AES-CBC. You can use AES-CBC, AES-CTR, AES-GCM, AES-KW, AES-CMAC.
 * @param keyUsages The key usages. Default is ["encrypt", "decrypt"]. You can use ["encrypt", "decrypt"], ["wrapKey", "unwrapKey"], ["sign", "verify"].
 * @returns A Promise with the key.
 */
export async function generate_aes_key(size: number = 256, extractable: boolean = true, algorithm: SymmetricAlgorithms, keyUsages?: crypto.webcrypto.KeyUsage[]) {

    if (size !== 128 && size !== 192 && size !== 256) {
        throw new Error("The size of the key must be 128, 192 or 256 bits. You provided size: " + size + " bits.");
    }

    let usages;
    if (!keyUsages) {
        usages = ["encrypt", "decrypt"] as crypto.webcrypto.KeyUsage[];
    } else {
        usages = keyUsages;
    }

    const key = await crypto.subtle.generateKey({
        name: algorithm,
        length: size,
    }, extractable, usages);

    return key;
}

/**
 * A function to return a hmac key with the given hash algorithm.
 * @param hash The hash algorithm to use. Default is SHA-256. You can use SHA-1, SHA-256, SHA-384, SHA-512.
 * @returns crypto.webcrypto.CryptoKey: Returns a key to use for generating HMAC signature.
 */
export async function generate_hmac_key(hash: string = 'SHA-256') {
    const key = await crypto.subtle.generateKey(
        {
            name: "HMAC",
            hash: { name: hash }
        },
        true,
        ["sign", "verify"]
    );

    return key;
}



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