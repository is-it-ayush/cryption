import { convertFromTo, export_symmetric_key, export_asymmetric_keys, exportKey, generate_iv } from "../helpers/utils";
import { decrypt_aes, encrypt_aes } from "./aes";
import { generate_aes_key, generate_rsa_oeap_key_pair, generate_hmac_key } from "./generate_keys";
import { decryptRSAOAEP, encryptRSAOAEP } from "./rsa_oaep";
import { pbkdf2, hkdf, scrypt } from "./key_derivation";
import { sign_with, verify_with } from "./digital_signatures";

// This class is used to export all the functions from the core folder to the main index.ts file
export class Cryption {


    // AES-GCM
    public aes = {
        generate_key: generate_aes_key.bind(this),
        encrypt: encrypt_aes.bind(this),
        decrypt: decrypt_aes.bind(this),
    }

    // RSA-OAEP
    public rsa = {
        oaep: {
            generate_key_pair: generate_rsa_oeap_key_pair.bind(this),
            encrypt: encryptRSAOAEP.bind(this),
            decrypt: decryptRSAOAEP.bind(this),
        }
    }

    //HMAC
    public hmac = {
        generate_key: generate_hmac_key.bind(this),
    }

    // Key Derivation
    public derive_key = {
        pbkdf2: pbkdf2.bind(this),
        hkdf: hkdf.bind(this),
        scrypt: scrypt.bind(this)
    }

    // Digital Signatures
    public signature = {
        sign: sign_with.bind(this),
        verify: verify_with.bind(this)
    }

    // Utils
    public export_symmetric_key = export_symmetric_key.bind(this);
    public export_asymmetric_key = export_asymmetric_keys.bind(this);
    public generate_iv = generate_iv.bind(this);
    private convertFromTo = convertFromTo.bind(this);
    private exportKey = exportKey.bind(this);
}