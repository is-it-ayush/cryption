import * as crypto from 'crypto';

export type ExportKeyFormat = 'pkcs8' | 'spki' | 'raw';
export type BufferConversion = 'base64' | 'hex' | 'binary' | 'utf8';

export type Algorithm =
  | crypto.webcrypto.AlgorithmIdentifier
  | crypto.webcrypto.RsaHashedImportParams
  | crypto.webcrypto.EcKeyImportParams
  | crypto.webcrypto.HmacImportParams
  | crypto.webcrypto.AesKeyAlgorithm;

export type SymmetricAlgorithms = 'AES-CBC' | 'AES-CTR' | 'AES-GCM';

export type HashType = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

// Key Derivation Digest Constants
export type DigestPBKDF = 'sha256' | 'sha512' | 'sha1' | 'md5' | 'rmd160';
