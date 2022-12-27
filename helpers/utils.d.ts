import * as crypto from 'crypto';

export type ExportKeyFormat = 'pkcs8' | 'spki' | 'raw';
export type BufferConversion = 'base64' | 'hex' | 'binary' | 'utf8';

export type Algorithm = crypto.webcrypto.AlgorithmIdentifier | crypto.webcrypto.RsaHashedImportParams | crypto.webcrypto.EcKeyImportParams | crypto.webcrypto.HmacImportParams | crypto.webcrypto.AesKeyAlgorithm;