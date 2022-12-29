import cryption from '@isitayush/cryption';
import { assert } from "console";

async function main() {

    // An example of how to use the library using AES-GCM.
    const my_string = "Hello World";
    const my_key = await cryption.generate_aes_key(256, true, 'AES-GCM');
    const my_iv = await cryption.generate_iv(96);

    const encrypted_buffer = await cryption.encrypt_aes(my_key, Buffer.from(my_string), 'AES-GCM', my_iv);
    const decrypted_string = await cryption.decrypt_aes(my_key, encrypted_buffer, 'AES-GCM', my_iv);

    console.log(Buffer.from(decrypted_string).toString('utf-8'));

    assert(my_string === Buffer.from(decrypted_string).toString('utf-8'));
}


main();