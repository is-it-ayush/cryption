import * as crypto from 'crypto';
import { convertFromTo } from '../helpers/utils';
import { DigestPBKDF, BufferConversion } from '../helpers/utils.d';

/**
 * A function to generate a hash of the string using PBKDF2.
 * @param data The data to encrypt. It must be a `string`.
 * @param salt The salt to use for the encryption. It must be a `Buffer`. You can use `cryption.random.salt()` to generate a random salt. 
 * @param iterations The number of iterations to use for the encryption. Default is 10000. Tune this value to increase the security of the encryption. 
 * @param keylen The length of the key to generate. Default is 64.
 * @param digest The digest to use for the encryption. You can use `sha512`, `sha256`, `sha1`, `md5`, `rmd160`. Default is `sha512`.
 * @param type The type of the key to generate. You can use `hex`, `base64`, `binary`, `buffer`. Default is `hex`.
 * @returns A Promise with the generated key. It will be a string of the specified type and length. By default it will be a `hex` string of length 64.
 */
export async function pbkdf2(data: string, salt: Buffer, iterations: number = 10000, keylen: number = 64, digest: DigestPBKDF = 'sha512', type: BufferConversion = "hex") {
    const key = await crypto.pbkdf2Sync(data, salt, iterations, keylen, digest);
    const convertedKey = await convertFromTo(type, key);
    return convertedKey;
}
/**
 * A function to generate a hash of the string using scrypt.
 * @param data The data to encrypt. It must be a `string`.
 * @param salt The salt to use for the encryption. It must be a `Buffer`. You can use `cryption.random.salt()` to generate a random salt.
 * @param keylen The length of the key to generate. Default is 64.
 * @param type The type of the key to generate. You can use `hex`, `base64`, `binary`, `buffer`. Default is `hex`.
 * @returns A Promise with the generated key. It will be a string of the specified type and length. By default it will be a `hex` string of length 64.
 */
export async function scrypt(data: string, salt: Buffer, keylen: number = 64, type: BufferConversion = "hex") {
    const key = await crypto.scryptSync(data, salt, keylen);
    const convertedKey = await convertFromTo(type, key);
    return convertedKey;
}
/**
 * A function to generate a hash of the string using HKDF.
 * @param data A string to use for the key derivation.
 * @param salt The salt to use for the encryption. It must be a `Buffer`. You can use `cryption.random.salt()` to generate a random salt.
 * @param keylen The length of the key to generate. Default is 64. 
 * @param type The type of the key to generate. You can use `hex`, `base64`, `binary`, `buffer`. Default is `hex`.
 * @returns 
 */
export async function hkdf(data: string, salt: Buffer, keylen: number = 64, type: BufferConversion = "hex") {

    const key = await crypto.createHmac('sha512', data).update(salt).digest();
    const convertedKey = await convertFromTo(type, key);
    return convertedKey;
}