import {
  convertFromTo,
  export_symmetric_key,
  export_asymmetric_keys,
  exportKey,
  generate_iv,
  generate_salt,
} from './helpers/utils';
import { decrypt as decrypt_aes, encrypt as encrypt_aes } from './aes';
import { generate_aes_key, generate_rsa_oeap_key_pair, generate_hmac_key } from './generate_keys';
import { encrypt as encrypt_rsaoaep, decrypt as decrypt_rsaoaep } from './rsa_oaep';
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
      encrypt: encrypt_rsaoaep.bind(this),
      decrypt: decrypt_rsaoaep.bind(this),
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
  public signatures = {
    sign: sign_with.bind(this),
    verify: verify_with.bind(this),
  };

  /**
   * These are the helper function that you can use to convert buffers, generate random values, etc.
   */
  public export = {
    keys: {
      symmetric: export_symmetric_key.bind(this),
      asymmetric: export_asymmetric_keys.bind(this),
    },
  }

  public buffer = {
    to: convertFromTo.bind(this),
  }


  public random = {
    iv: generate_iv.bind(this),
    salt: generate_salt.bind(this),
  }

  private exportKey = convertFromTo.bind(this);
}

const cryption = new Cryption();

// Check if we're in a browser or in Node.js
if (typeof global.window !== 'undefined') {
  if (global.window.location.protocol !== 'https:') {
    throw new DOMException("@isitayush/cryption: The wrapper relies on `window.crypto.subtle` API which is only available in secure contexts i.e. HTTPS. Please make sure you're on HTTPS. If not, google how to switch to HTTPS for your framework.")
  } else if (!global.window.crypto) {
    throw new DOMException("@isitayush/cryption: The wrapper relies on `window.crypto.subtle` API which is not available in your browser. Please use a browser that supports this API.")
  }
}

export default cryption;
