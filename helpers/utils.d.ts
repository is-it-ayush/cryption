export type KeyFormatType = {
    'raw': ArrayBuffer,
    'pkcs8': ArrayBuffer,
    'spki': ArrayBuffer,
    'jwk': crypto.JsonWebKey
}[KeyFormat];