import * as crypto from 'crypto';
import type { ExportKeyFormat, BufferConversion, Algorithm } from './utils.d';


export async function exportKey(key: crypto.webcrypto.CryptoKey, format: ExportKeyFormat) {
    // If the key is not extractable, we can't export it
    if (!key.extractable) {
        throw new Error("The key's are not extractable. If you want to export them, set the extractable flag to true while generating a Key Pair.");
    }
    const exportedKey = await crypto.subtle.exportKey(format, key);
    return exportedKey;
}

export async function fromBufferTo(buffer: ArrayBuffer, mode: BufferConversion) {
    const result = await Buffer.from(buffer).toString(mode);
    return result;
}

export async function export_asymmetric_keys(keys: crypto.webcrypto.CryptoKeyPair) {

    const exportedPublicKey = await exportKey(keys.publicKey, "spki"); // returns ArrayBuffer
    const exportedPrivateKey = await exportKey(keys.privateKey, "pkcs8"); // returns ArrayBuffer
    // To Base64: This is the format that is used in the .pem files
    const convertedKey = {
        publicKey: await fromBufferTo(exportedPublicKey, "base64"), // returns string
        privateKey: await fromBufferTo(exportedPrivateKey, "base64") // returns string
    }

    return convertedKey;
}

export async function export_symmetric_key(key: crypto.webcrypto.CryptoKey) {
    const exportedKey = await exportKey(key, "raw");
    const convertedKey = await fromBufferTo(exportedKey, "base64");
    return convertedKey;
}

