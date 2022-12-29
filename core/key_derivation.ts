import * as crypto from 'crypto';
import { convertFromTo } from '../helpers/utils';
import { DigestPBKDF, BufferConversion } from '../helpers/utils.d';

export async function pbkdf2(password: string, salt: string, iterations: number = 10000, keylen: number, digest: DigestPBKDF = 'sha512', type: BufferConversion) {
    const key = await crypto.pbkdf2Sync(password, salt, iterations, keylen, digest);
    const convertedKey = await convertFromTo(key, type);
    return convertedKey;
}

export async function scrypt(password: string, salt: string, keylen: number, type: BufferConversion) {
    const key = await crypto.scryptSync(password, salt, keylen);
    const convertedKey = await convertFromTo(key, type);
    return convertedKey;
}

export async function hkdf(password: string, salt: string, keylen: number, type: BufferConversion) {
    const key = await crypto.createHmac('sha512', password).update(salt).digest();
    const convertedKey = await convertFromTo(key, type);
    return convertedKey;
}