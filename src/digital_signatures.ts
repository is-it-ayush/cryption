import * as crypto from 'crypto';
import type { HashType } from './helpers/utils.d';

/**
 * This function is used to generate a signature of the data using the key & algorithm provided.
 * @param key The key to use for generating signature.
 * @param data The data to sign.
 * @param algorithm  The algorithm to use. You can use HMAC, RSASSA-PKCS1-v1_5, ECDSA, RSA-PSS.
 * @param hash Optional, Use only in ECDSA. The hash to use. You can use SHA-256, SHA-384, SHA-512. SHA-1 is also supported but is not secure. Default is SHA-256
 * @param saltLength Optional, Use only in RSA-PSS. This should be the length of the digest that was used when the key was generated. If it was `SHA-256`. The length would be 32. Default is 32.
 * @returns `ArrayBuffer`- The signature in ArrayBuffer.
 */
export async function sign_with(
  key: crypto.webcrypto.CryptoKey,
  data: Buffer,
  algorithm: string,
  hash: HashType = 'SHA-256',
  saltLength: number = 32,
) {
  if (!key || !data || !algorithm) throw new DOMException('There are some missing arguments.');

  // input validation logic
  let alg;
  algorithm = algorithm.toLowerCase();

  switch (algorithm) {
    case 'RSASSA-PKCS1-v1_5'.toLowerCase():
      alg = { name: 'RSASSA-PKCS1-v1_5' };
      break;
    case 'HMAC'.toLowerCase():
      alg = { name: 'HMAC' };
      break;
    case 'ECDSA'.toLowerCase():
      alg = { name: 'ECDSA', hash: { name: hash } } as crypto.webcrypto.EcdsaParams;
      break;
    case 'RSA-PSS'.toLowerCase():
      alg = { name: 'RSA-PSS', saltLength } as crypto.webcrypto.RsaPssParams;
      break;
    default:
      alg = { name: 'HMAC' };
      break;
  }

  const signature = await window.crypto.subtle.sign(alg, key, data);
  return signature;
}

/**
 * This function is used to verify a signature of the data by generating another signature using the key & the provided algorithm.
 * @param key The key to use for generating signature.
 * @param data The data to sign.
 * @param algorithm  The algorithm to use. You can use HMAC, RSASSA-PKCS1-v1_5, ECDSA, RSA-PSS.
 * @param signature The signature to verify.
 * @param hash Optional, Use only in ECDSA. The hash to use. You can use SHA-256, SHA-384, SHA-512. SHA-1 is also supported but is not secure. Default is SHA-256
 * @param saltLength Optional, Use only in RSA-PSS. This should be the length of the digest that was used when the key was generated. If it was `SHA-256`. The length would be 32. Default is 32.
 * @returns `ArrayBuffer`- The signature in ArrayBuffer
 */
export async function verify_with(
  key: crypto.webcrypto.CryptoKey,
  data: Buffer,
  algorithm: string,
  signature: Buffer,
  hash: HashType = 'SHA-256',
  saltLength: number = 32,
) {
  if (!key || !data || !algorithm || !signature) throw new DOMException('There are some missing arguments.');

  // input validation logic
  let alg;
  algorithm = algorithm.toLowerCase();

  switch (algorithm) {
    case 'RSASSA-PKCS1-v1_5'.toLowerCase():
      alg = { name: 'RSASSA-PKCS1-v1_5' };
      break;
    case 'HMAC'.toLowerCase():
      alg = { name: 'HMAC' };
      break;
    case 'ECDSA'.toLowerCase():
      alg = { name: 'ECDSA', hash: { name: hash } } as crypto.webcrypto.EcdsaParams;
      break;
    case 'RSA-PSS'.toLowerCase():
      alg = { name: 'RSA-PSS', saltLength } as crypto.webcrypto.RsaPssParams;
      break;
    default:
      alg = { name: 'HMAC' };
      break;
  }

  const result = await window.crypto.subtle.verify(alg, key, signature, data);
  return result;
}
