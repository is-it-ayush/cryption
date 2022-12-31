import * as crypto from 'crypto';

/**
 * Use this function to encrypt data with RSA-OAEP.
 * @param key The key to use for the encryption. It must be a `crypto.webcrypto.CryptoKey`.
 * @param data The data to encrypt. It must be an `ArrayBuffer`.
 * @returns A Promise with the encrypted data of type `ArrayBuffer`.
 */
export async function encryptRSAOAEP(key: crypto.webcrypto.CryptoKey, data: Buffer) {
  if (!data || !key) {
    throw new Error('The are missing parameters. The key or data were not found as an argument. ');
  }

  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    key,
    data,
  );
  return encrypted;
}

/**
 * Use this function to decrypt data with RSA-OAEP.
 * @param key The key to use for the decryption. It must be a `crypto.webcrypto.CryptoKey`.
 * @param data The data to decrypt. It must be an `ArrayBuffer`.
 * @returns A Promise with the decrypted data of type `ArrayBuffer`.
 */
export async function decryptRSAOAEP(key: crypto.webcrypto.CryptoKey, data: ArrayBuffer) {
  if (!data || !key) {
    throw new Error('The are missing parameters. The key or data were not found as an argument. ');
  }

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP',
    },
    key,
    data,
  );
  return decrypted;
}
