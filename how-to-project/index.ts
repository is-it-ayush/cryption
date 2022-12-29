import cryption from '@isitayush/cryption';
import { assert } from "console";

async function main() {

    // An example of how to use the library using AES-GCM.
    const my_string = "Hello World";

    const my_iv = await cryption.helpers.random.iv(96);
    const my_key = await cryption.aes.generate_key(256, true, 'AES-GCM');

    const encrypted_buffer = await cryption.aes.encrypt(my_key, Buffer.from(my_string), 'AES-GCM', my_iv);
    const decrypted_string = await cryption.aes.decrypt(my_key, encrypted_buffer, 'AES-GCM', my_iv);

    console.log(Buffer.from(decrypted_string).toString('utf-8'));

    assert(my_string === Buffer.from(decrypted_string).toString('utf-8'));
}


main();