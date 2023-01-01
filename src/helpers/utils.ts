import * as crypto from 'crypto';
import type { ExportKeyFormat, BufferConversion, Algorithm } from './utils.d';

/**
 * Use this function to export a key to a ArrayBuffer in a specified format.
 * @param key The key to use for the encryption. It must be a CryptoKey.
 * @param format The format of the key. It must be a string. You can choose between "spki" and "pkcs8" and "raw".
 * @returns A Promise with the exported key. It will be an ArrayBuffer.
 * @throws A DOMException if the key is not extractable.
 */
export async function exportKey(key: crypto.webcrypto.CryptoKey, format: ExportKeyFormat) {
  // If the key is not extractable, we can't export it
  if (!key.extractable) {
    throw new DOMException(
      "@isitayush/cryption: The key's are not extractable. If you want to export them, set the extractable flag to true while generating a Key Pair.",
    );
  }
  const exportedKey = await window.crypto.subtle.exportKey(format, key);
  return exportedKey;
}

/**
 * Use this function to convert a Buffer to a string of the specified mode.
 * @param mode You can choose between "base64", "hex" and "utf8" and "binary".
 * @param data The data to convert. It must be an ArrayBuffer.
 * @returns A Promise with the converted data. It will be a string of the specified mode.
 */
export async function convertFromTo(mode: BufferConversion, data: ArrayBuffer) {
  const result = await Buffer.from(data).toString(mode);
  return result;
}

/**
 * Use this function to export both the public and private key of a Key Pair in string of the specified mode.
 * @param keys The Key Pair to export. It must be of CryptoKeyPair Type.'
 * @param mode The mode to convert the keys to. You can choose between "base64", "hex" and "utf8" and "binary".
 * @returns A Promise with object `{publicKey: string, privateKey: string}` in the specified mode.
 */
export async function export_asymmetric_keys(keys: crypto.webcrypto.CryptoKeyPair, mode: BufferConversion) {
  const exportedPublicKey = await exportKey(keys.publicKey, 'spki'); // returns ArrayBuffer
  const exportedPrivateKey = await exportKey(keys.privateKey, 'pkcs8'); // returns ArrayBuffer
  // To Base64: This is the format that is used in the .pem files
  const convertedKey = {
    publicKey: await convertFromTo(mode, exportedPublicKey), // returns string
    privateKey: await convertFromTo(mode, exportedPrivateKey), // returns string
  };

  return convertedKey;
}
/**
 * Use this function to export a symmetric key. It will return a Promise with the key.
 * @param key The key to export. It must be a CryptoKey.
 * @param mode The mode to convert the key to. You can choose between "base64", "hex" and "utf8" and "binary".
 * @returns A Promise with the key in the specified mode as a string.
 */
export async function export_symmetric_key(key: crypto.webcrypto.CryptoKey, mode: BufferConversion) {
  const exportedKey = await exportKey(key, 'raw');
  const convertedKey = await convertFromTo(mode, exportedKey);
  return convertedKey;
}

/**
 * Generates a random IV. The length of the IV is dependent on the algorithm it'll be used for.
 * @param length The length of the IV in bits.
 * @returns The IV in the form of a Buffer.
 */
export async function generate_iv(length: number) {
  const iv = await crypto.randomBytes(length);
  return iv;
}
/**
 * Generates a random salt. The length of the salt is dependent on the algorithm it'll be used for.
 * @param length The length of the salt in bits.
 * @returns The salt in the form of a Buffer.
 */
export async function generate_salt(length: number) {
  const salt = await crypto.randomBytes(length);
  return salt;
}
