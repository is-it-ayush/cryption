import * as crypto from 'crypto';

/**
 * Use this function to encrypt data with RSA-OAEP.
 * @param key The key to use for the encryption. It must be a `crypto.webcrypto.CryptoKey`.
 * @param data The data to encrypt. It must be an `ArrayBuffer`.
 * @returns A Promise with the encrypted data of type `ArrayBuffer`.
 * @throws A DOMException if the data is not valid for the operation or the key is not valid.
 */
export async function encrypt(key: crypto.webcrypto.CryptoKey, data: Buffer) {
  if (!data || !key) {
    throw new DOMException(
      '@isitayush/cryption: The are missing parameters. The key or data were not found as an argument. ',
    );
  }

  let encrypted = new ArrayBuffer(0);
  try {
    encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      key,
      data,
    );
  } catch (error) {
    if (error instanceof DOMException) {
      if (error.name === 'OperationError') {
        throw new DOMException(
          '@isitayush/cryption: The data is not valid for the encryption operation or it could be corrupted.',
        );
      } else if (error.name === 'InvalidAccessError') {
        throw new DOMException('@isitayush/cryption: The key is not valid for the given data.');
      }
    }
  }
  return encrypted;
}

/**
 * Use this function to decrypt data with RSA-OAEP.
 * @param key The key to use for the decryption. It must be a `crypto.webcrypto.CryptoKey`.
 * @param data The data to decrypt. It must be an `ArrayBuffer`.
 * @returns A Promise with the decrypted data of type `ArrayBuffer`.
 * @throws A DOMException if the data is not valid for the operation or the key is not valid.
 */
export async function decrypt(key: crypto.webcrypto.CryptoKey, data: ArrayBuffer) {
  if (!data || !key) {
    throw new DOMException(
      '@isitayush/cryption: The are missing parameters. The key or data were not found as an argument. ',
    );
  }

  let decrypted = new ArrayBuffer(0);
  try {
    decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      key,
      data,
    );
  } catch (error) {
    if (error instanceof DOMException) {
      if (error.name === 'OperationError') {
        throw new DOMException(
          '@isitayush/cryption: The data is not valid for the decryption operation or it could be corrupted.',
        );
      } else if (error.name === 'InvalidAccessError') {
        throw new DOMException('@isitayush/cryption: The key is not valid for the given data.');
      }
    }
  }

  return decrypted;
}
