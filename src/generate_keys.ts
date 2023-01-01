import * as crypto from 'crypto';
import { SymmetricAlgorithms } from './helpers/utils.d';
import { allowedRSAOEAPSizes, allowedRSAOEAPHashes } from './helpers/constants';

/**
 * A function to return a symmetric key with the given size.
 * @param size The size of the key. You can use 128, 192 or 256 bits. Default is 256 bits
 * @param extractable A boolean to set the key as extractable or not. Default is true.
 * @param algorithm The algorithm to use. You can use AES-CBC, AES-CTR, AES-GCM, AES-KW, AES-CMAC. Default is AES-CBC
 * @param keyUsages The key usages. You can use ["encrypt", "decrypt"], ["wrapKey", "unwrapKey"], ["sign", "verify"] according to the algorithm. Default is ["encrypt", "decrypt"].
 * @returns A Promise with the key.
 */
export async function generate_aes_key(
  size: number = 256,
  extractable: boolean = true,
  algorithm: SymmetricAlgorithms = 'AES-CBC',
  keyUsages: crypto.webcrypto.KeyUsage[] = ['encrypt', 'decrypt'],
) {
  if (size !== 128 && size !== 192 && size !== 256) {
    throw new DOMException('The size of the key must be 128, 192 or 256 bits. You provided size: ' + size + ' bits.');
  }
  const key = await window.crypto.subtle.generateKey(
    {
      name: algorithm,
      length: size,
    },
    extractable,
    keyUsages,
  );

  return key;
}

/**
 * A function to return a hmac key with the given hash algorithm.
 * @param hash The hash algorithm to use. You can use SHA-1, SHA-256, SHA-384, SHA-512. Default is SHA-256. Note: SHA-1 is known to be insecure.
 * @returns crypto.webcrypto.CryptoKey: Returns a key to use for generating digital signatures or verifying digital signatures with HMAC.
 */
export async function generate_hmac_key(hash: string = 'SHA-256') {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'HMAC',
      hash: { name: hash },
    },
    true,
    ['sign', 'verify'],
  );

  return key;
}

/**
 * A function to return a RSA-OAEP key pair with the given size and hash algorithm.
 * @param size This is the size of the key. You can use 512, 1024, 2048, 4096 or 8192 bits. It is recommended to use 2048 bits or more. Default is 2048 bits.
 * @param hash This is the hash algorithm to use. You can use SHA-1, SHA-256, SHA-384 or SHA-512. Default is SHA-256. Note: SHA-1 is known to be insecure.
 * @param extractable A boolean to set the key as extractable or not. Default is true.
 * @returns A Promise with the key.
 */

export async function generate_rsa_oeap_key_pair(
  size: number = 2048,
  hash: string = 'SHA-256',
  extractable: boolean = true,
) {
  if (!allowedRSAOEAPSizes.includes(size)) {
    throw new DOMException(
      'The size of the key must be 512, 1024, 2048, 4096 or 8192 bits. You provided size: ' + size + ' bits.',
    );
  }

  if (!allowedRSAOEAPHashes.includes(hash)) {
    throw new DOMException(
      'The hash algorithm must be SHA-1, SHA-256, SHA-384 or SHA-512. You provided hash: ' + hash + '.',
    );
  }

  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: size,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 24 bit representation of 65537
      hash,
    },
    extractable,
    ['encrypt', 'decrypt'],
  );

  return keyPair;
}
