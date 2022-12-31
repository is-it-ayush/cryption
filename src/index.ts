import {
  convertFromTo,
  export_symmetric_key,
  export_asymmetric_keys,
  exportKey,
  generate_iv,
  generate_salt,
} from './helpers/utils';
import { decrypt_aes, encrypt_aes } from './aes';
import { generate_aes_key, generate_rsa_oeap_key_pair, generate_hmac_key } from './generate_keys';
import { decryptRSAOAEP, encryptRSAOAEP } from './rsa_oaep';
import { pbkdf2, hkdf, scrypt } from './key_derivation';
import { sign_with, verify_with } from './digital_signatures';

// This class acts as a wrapper around the functions in the other files.
class Cryption {
  /**
   * Symmetric Encryption. AES-GCM, AES-CBC, AES-CTR supported.
   * Recommended to use AES-GCM if you're using to encrypt data in your application.
   * The default algorithm is AES-CBC. An `iv` is required for AES-CBC and AES-GCM.
   */
  public aes = {
    generate_key: generate_aes_key.bind(this),
    encrypt: encrypt_aes.bind(this),
    decrypt: decrypt_aes.bind(this),
  };

  /**
   * Asymmetric Encryption. RSA-OAEP supported.
   */
  public rsa = {
    oaep: {
      generate_key_pair: generate_rsa_oeap_key_pair.bind(this),
      encrypt: encryptRSAOAEP.bind(this),
      decrypt: decryptRSAOAEP.bind(this),
    },
  };

  /**
   * HMAC. SHA-256, SHA-384, SHA-512 supported.
   */
  public hmac = {
    generate_key: generate_hmac_key.bind(this),
  };

  /**
   * Key Derivation. PBKDF2, HKDF, Scrypt supported.
   * Recommended to use PBKDF2 if you're using to generate password hashes in your application.
   */
  public derive = {
    pbkdf2: pbkdf2.bind(this),
    hkdf: hkdf.bind(this),
    scrypt: scrypt.bind(this),
  };

  /**
   * Digital Signatures are used to verify the authenticity of a message.
   * HMAC, RSASSA-PKCS1-v1_5, ECDSA, RSA-PSS supported.
   */
  public signature = {
    sign: sign_with.bind(this),
    verify: verify_with.bind(this),
  };

  /**
   * These are the helper function that you can use to convert buffers, generate random values, etc.
   */
  public helpers = {
    export: {
      keys: {
        symmetric: export_symmetric_key.bind(this),
        asymmetric: export_asymmetric_keys.bind(this),
      },
    },
    random: {
      iv: generate_iv.bind(this),
      salt: generate_salt.bind(this),
    },
    buffer: {
      to: convertFromTo.bind(this),
    },
  };

  private exportKey = convertFromTo.bind(this);
}

const cryption = new Cryption();

if (typeof window === 'undefined') {
  throw new Error('@isitayush/cryption is a browser only library. It cannot be used in Node.js.');
} else if (typeof window.crypto === 'undefined') {
  throw new Error(
    "Are you sure you're on https? It is important for the API for work. Please lookup, on how to enable https for your framework. If you are on https, then your browser doesn't support the Web Crypto API. :<",
  );
} else if (typeof window.crypto.subtle === 'undefined') {
  throw new Error("Your browser doesn't support the Web Crypto API. :<");
}

export default cryption;
