import * as crypto from 'crypto';
import { generalHashes } from '../helpers/constants';

/**
 * This function is used to generate a signature of the data using the key & algorithm provided.
 * By default, If the algorithm is not specified. It uses HMAC with SHA-256 to generate the signature.
 * @param key The key to use for generating signature.
 * @param data The data to sign.
 * @param algorithm  The algorithm to use. Default is HMAC. You can use HMAC, RSASSA-PKCS1-v1_5, ECDSA, RSA-PSS.
 * @param hash Optional, Use only in ECDSA, HMAC. The hash to use. Default is SHA-256. You can use SHA-1, SHA-256, SHA-384, SHA-512.
 * @param saltLength Optional, Use only in RSA-PSS. The salt length to use. Default is 32. 
 * @returns `ArrayBuffer`- The signature in ArrayBuffer
 */
export async function sign_with(key: crypto.webcrypto.CryptoKey, data: crypto.webcrypto.BufferSource, algorithm: string, hash?: string, saltLength?: number) {

    if (!key || !data || !algorithm) throw new Error('There are some missing arguments.');

    // input validation logic
    let alg, hsh, saltLen;
    algorithm = algorithm.toLowerCase();
    hsh = hash && generalHashes.includes(hash.toUpperCase()) ? hash.toLowerCase() : 'sha-256';
    saltLen = saltLength && saltLength > 0 ? saltLength : 32;

    // --note-- this is a really bad way i guess. i'll fix it later : ) probably use a switch case
    if (algorithm === 'RSASSA-PKCS1-v1_5'.toLowerCase()) alg = { name: "RSASSA-PKCS1-v1_5" }
    else if (algorithm === 'HMAC'.toLowerCase()) alg = { name: "HMAC" }
    else if (algorithm === 'ECDSA'.toLowerCase()) alg = { name: "ECDSA", hash: { name: hsh } }
    else if (algorithm === 'RSA-PSS'.toLowerCase()) alg = { name: "RSA-PSS", saltLength: saltLen }
    else {
        alg = {
            name: "HMAC", hash: { name: hsh }
        }
    }
    const signature = await crypto.subtle.sign(alg, key, data);
    return signature;
}

/**
 * This function is used to verify a signature of the data by generating another signature using the key & the provided algorithm. 
 * By default, it uses HMAC and SHA-256 to generate the signature and verify it.
 * @param key The key to use for generating signature.
 * @param data The data to sign.
 * @param algorithm  The algorithm to use. Default is HMAC. You can use HMAC, RSASSA-PKCS1-v1_5, ECDSA, RSA-PSS.
 * @param signature The signature to verify generated signature with.
 * @param hash Optional, Use only in ECDSA, HMAC. The hash to use. Default is SHA-256. You can use SHA-1, SHA-256, SHA-384, SHA-512.
 * @param saltLength Optional, Use only in RSA-PSS. The salt length to use. Default is 32. 
 * @returns `ArrayBuffer`- The signature in ArrayBuffer
 */
export async function verify_with(key: crypto.webcrypto.CryptoKey, data: crypto.webcrypto.BufferSource, algorithm: string, signature: Buffer, hash?: string, saltLength?: number) {

    if (!key || !data || !algorithm || !signature) throw new Error('There are some missing arguments.');

    // input validation logic
    let alg, hsh, saltLen;
    algorithm = algorithm.toLowerCase();
    hsh = hash && generalHashes.includes(hash.toUpperCase()) ? hash.toLowerCase() : 'sha-256';
    saltLen = saltLength && saltLength > 0 ? saltLength : 32;

    // --note-- this is a really bad way i guess. i'll fix it later : ) probably use a switch case
    if (algorithm === 'RSASSA-PKCS1-v1_5'.toLowerCase()) alg = { name: "RSASSA-PKCS1-v1_5" }
    else if (algorithm === 'HMAC'.toLowerCase()) alg = { name: "HMAC" }
    else if (algorithm === 'ECDSA'.toLowerCase()) alg = { name: "ECDSA", hash: { name: hsh } }
    else if (algorithm === 'RSA-PSS'.toLowerCase()) alg = { name: "RSA-PSS", saltLength: saltLen }
    else {
        alg = {
            name: "HMAC", hash: { name: hsh }
        }
    }

    const result = await crypto.subtle.verify(alg, key, signature, data);
    return result;
}