import { convertFromTo, export_symmetric_key, export_asymmetric_keys, exportKey } from "../helpers/utils";
import { decryptAES, encryptAES } from "./aes";
import { generate_aes_key, generate_rsa_oeap_key_pair, generate_hmac_key } from "./generate_keys";
import { decryptRSAOAEP, encryptRSAOAEP } from "./rsa_oaep";
import { pbkdf2, hkdf, scrypt } from "./key_derivation";
import { sign_with, verify_with } from "./digital_signatures";

// This class is used to export all the functions from the core folder to the main index.ts file
export class Cryption {

    // AES
    public generate_aes_key = generate_aes_key.bind(this);
    public encryptAES = encryptAES.bind(this);
    public decryptAES = decryptAES.bind(this);

    // RSA
    public generate_rsa_oaep_key_pair = generate_rsa_oeap_key_pair.bind(this);
    public encryptRSAOAEP = encryptRSAOAEP.bind(this);
    public decryptRSAOAEP = decryptRSAOAEP.bind(this);

    //HMAC
    public generate_hmac_key = generate_hmac_key.bind(this);

    // Key Derivation
    public pbkdf2 = pbkdf2.bind(this);
    public hkdf = hkdf.bind(this);
    public scrypt = scrypt.bind(this);

    // Digital Signatures
    public sign = sign_with.bind(this);
    public verify = verify_with.bind(this);

    // Utils
    public export_symmetric_key = export_symmetric_key.bind(this);
    public export_asymmetric_key = export_asymmetric_keys.bind(this);
    private convertFromTo = convertFromTo.bind(this);
    private exportKey = exportKey.bind(this);
}