import * as crypto from 'crypto';
import { type KeyFormatType } from './utils';

export async function arrayBufferToBase64(buffer: ArrayBuffer) {
    const base64 = Buffer.from(buffer).toString('base64');
    return base64;
}

export async function base64ToArrayBuffer(base64: string) {
    const buffer = Buffer.from(base64, 'base64');
    return buffer;
}

export async function exportKey(key: crypto.webcrypto.CryptoKey, format: KeyFormatType) {

    const exportedKey = await crypto.subtle.exportKey(format, key);
    return exportedKey;
}

export async function encry 