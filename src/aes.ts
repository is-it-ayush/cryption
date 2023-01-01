import * as crypto from 'crypto';
import { SymmetricAlgorithms } from './helpers/utils.d';

/**
 * A function to encrypt data with AES.
 * @param key The key to use for the encryption. You can use a secret symmetric key.
 * @param data The data to encrypt. It must be a Buffer.
 * @param iv If the algorithm is AES-CBC (default) or AES-GCM, you must provide an IV.
 * @param counter If the algorithm is AES-CTR, you must provide a counter.
 * @returns A Promise with the encrypted data.
 * @throws A DOMException if the data is not valid for the operation or the key is not valid.
 */
export async function encrypt(
  key: crypto.webcrypto.CryptoKey,
  data: Buffer,
  iv?: ArrayBuffer,
  counter?: ArrayBuffer,
) {
  // Validation of the parameters
  if (!key || !data) {
    throw new DOMException('You must provide a key and data to encrypt. There are missing parameters.');
  }

  if (!iv && (key.algorithm.name === 'AES-CBC' || key.algorithm.name === 'AES-GCM')) {
    throw new DOMException('You must provide an IV for the ' + key.algorithm.name + ' algorithm.');
  } else if (!counter && key.algorithm.name === 'AES-CTR') {
    throw new DOMException('You must provide a counter for the ' + key.algorithm.name + ' algorithm.');
  }

  let encrypted: ArrayBuffer = new ArrayBuffer(0);
  try {
    // Do the encryption based on the algorithm and the parameters
    if (iv) {
      encrypted = await window.crypto.subtle.encrypt(
        {
          name: key.algorithm.name,
          iv,
        },
        key,
        data,
      );
    } else if (counter) {
      encrypted = await window.crypto.subtle.encrypt(
        {
          name: key.algorithm.name,
          counter,
          length: 128,
        },
        key,
        data,
      );
    }
  }
  catch (error) {
    if (error instanceof DOMException) {
      if (error.name === 'OperationError') {
        throw new DOMException('@isitayush/cryption: The data is not valid for the operation. It could be that the IV or counter is not the same, missing or of invalid length.');
      }
      else if (error.name === 'InvalidAccessError') {
        throw new DOMException('@isitayush/cryption: The key is not valid or the data could be corrupted.');
      }
    }
  }

  return encrypted;
}

/**
 * A function to decrypt data with AES.
 * @param key The key to use for the decryption. You must use the same secret key that was used to encrypt the data.
 * @param data The data to decrypt. It must be an ArrayBuffer.
 * @param iv If the algorithm is AES-CBC (default) or AES-GCM, you must provide an IV.
 * @param counter If the algorithm is AES-CTR, you must provide a counter.
 * @returns A Promise with the decrypted data.
 * @throws A DOMException if the data is not valid for the operation or the key is not valid.
 */
export async function decrypt(
  key: crypto.webcrypto.CryptoKey,
  data: ArrayBuffer,
  iv?: ArrayBuffer,
  counter?: ArrayBuffer,
) {
  // Validation of the parameters
  if (!key || !data) {
    throw new DOMException('You must provide a key and data to decrypt. There are missing parameters.');
  }

  // Validation Conditions
  if (!iv && (key.algorithm.name === 'AES-CBC' || key.algorithm.name === 'AES-GCM')) {
    throw new DOMException('You must provide an IV for the ' + key.algorithm.name + ' algorithm.');
  } else if (!counter && key.algorithm.name === 'AES-CTR') {
    throw new DOMException('You must provide a counter for the ' + key.algorithm.name + ' algorithm.');
  }

  let decrypted: ArrayBuffer = new ArrayBuffer(0);
  try {
    // Do the decryption based on the algorithm and the parameters
    if (iv) {
      decrypted = await window.crypto.subtle.decrypt(
        {
          name: key.algorithm.name,
          iv,
        },
        key,
        data,
      );
    } else {
      decrypted = await window.crypto.subtle.decrypt(
        {
          name: key.algorithm.name,
          counter,
          length: 128,
        },
        key,
        data,
      );
    }
  }
  catch (error) {
    if (error instanceof DOMException) {
      if (error.name === 'OperationError') {
        throw new DOMException('@isitayush/cryption: The data is not valid for the operation. It could be that the IV or counter is not the same, missing or of invalid length.');
      }
      else if (error.name === 'InvalidAccessError') {
        throw new DOMException('@isitayush/cryption: The key is not valid or the data could be corrupted.');
      }
    }
  }

  return decrypted;
}
