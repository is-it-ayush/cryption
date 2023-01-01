import cryption from '@isitayush/cryption';
import { assert } from "console";


/**
 * A very common use case is to store a user's password in a database.
 * But we can't store the password in the database as a plain-text because anyone with access to the database can read the password. BAD IDEA!
 * To fix this, we don't store the password directly. We calculate a 'hash' of the password and store that in the database.
 * 
 * But this raises a question? What happens if two user's have the same password?
 * The answer is that the hash of the password will be the same for both users.
 * 
 * To fix this, we add a 'salt' to the password. The salt is a random string that is added to the password before calculating the hash.
 * This way, even if two users have the same password, the hash will be different because of the salt.
 * 
 * 
 */
export async function password_store_in_db() {

    // Let's say we have a user with the following password.
    const password = "Hello World";

    // We generate a random salt for the user.
    const salt = await cryption.random.salt(96); // 96 bits = 12 bytes = 24 characters

    // We calculate the hash of the password using the salt.
    const hash = await cryption.derive.pbkdf2(password, salt, 100000,);

    // We store the salt and the hash in the database. Say, salt.hash or salt:hash.
    // But, Since we are using pbkdf2, we also need to store the iterations.
    // A good practice is to randomly generate the iterations within a range. However, be careful not to make the range too small that it becomes easy to brute force.
    // Iteration's work as a 'cost' for the attacker. The more iterations, the more time it will take to brute force the password.

    const save_to_db = `${salt}.${hash}.${100000}`; // Our iteration is hardcoded to 100000. But, in real life, it should be randomly generated within a range.
    // You can modify the above line format to whatever you want. But, make sure you store the salt, hash and iterations in the database if you're using pbkdf2.

    // If a user tries to login, we get the salt and hash from the database.
    const [salt_from_db, hash_from_db, iterations_from_db] = save_to_db.split(".");

    // We calculate the hash of the password using the salt from the database.
    const hash_of_password = await cryption.derive.pbkdf2(password, Buffer.from(hash_from_db), parseInt(iterations_from_db));

    // We compare the hash of the password with the hash from the database.
    assert(hash_of_password === hash_from_db); // If the hashes match, the password is correct, you can login the user.
}

/**
 * Another very common use case is to encrypt and decrypt data.
 * In this example, we will encrypt and decrypt a string.
 */

export async function encrypt_and_decrypt_string() {

    // Let's say we have a string that we want to encrypt.
    const data = "Hello World";

    // We will also need an IV for this example.
    // IV stands for Initialization Vector.
    const iv = await cryption.random.iv(96); // 96 bits = 12 bytes = 24 characters

    // We generate a random key for the encryption.
    // I'm using AES-GCM because it's the most secure algorithm we have. : )
    // This is also an example of Symmetric Encryption. This means that the same key is used for encryption and decryption and there is only one key.
    const key = await cryption.aes.generate_key(256, true, "AES-GCM", ["encrypt", "decrypt"]);

    // We encrypt the data using the key.
    const encrypted_data = await cryption.aes.encrypt(key, Buffer.from(data), iv);

    // This is now encrypted. Unless you have the key & IV both or 14 billion years, you can't decrypt it.

    // We will now decrypt the data using the key.
    const decrypted_data = await cryption.aes.decrypt(key, encrypted_data, iv);

    // We convert the decrypted data to a string.
    const decrypted_data_string = await cryption.buffer.to("utf8", decrypted_data);

    // We compare the decrypted data with the original data.
    assert(decrypted_data_string === data); // If the strings match, the data is correct, you can use it.
}

// Anything that you transfer over the internet should ideally be both encrypted and authenticated.
// Why authentication? Encryption only hides the data. But, if someone intercepts the data, they can still change the encrypted bits of data.
// Authentication ensures that the data is not tampered with. It ensures that the data is not changed during transit over the web.

/**
 * In this example, we will encrypt and decrypt a string and authenticate it.
 * We will also use a different algorithm for encryption and authentication.
 * This is an example of Asymmetric Encryption. This means that there are two keys. One for encryption and one for authentication.
 *  
 */

export async function encrypt_and_decrypt_string_and_authenticate() {

    // Let's say we have a string that we want to encrypt.
    const data = "Hello World";

    // We will also need an IV for this example.
    // IV stands for Initialization Vector.
    const iv = await cryption.random.iv(96); // 96 bits = 12 bytes = 24 characters

    // We generate a random key for the encryption.
    // I'm using AES-GCM because it's the most secure algorithm we have. : )
    const encryption_key = await cryption.aes.generate_key(256, true, "AES-GCM", ["encrypt", "decrypt"]);

    // We generate a random key for the authentication.
    // I'm using HMAC-SHA512 because it's the most secure algorithm we have. : )
    const authentication_key = await cryption.hmac.generate_key("SHA-256");

    // We encrypt the data using the encryption key.
    const encrypted_data = await cryption.aes.encrypt(encryption_key, Buffer.from(data), iv);

    // We authenticate the data using the authentication key.
    const authentication_tag = await cryption.signatures.sign(authentication_key, Buffer.from(encrypted_data), "HMAC");

    // This is now encrypted and authenticated. Unless you have the encryption key, authentication key and IV both or 14 billion years, you can't decrypt it.

    // We will now decrypt the data using the encryption key.
    const decrypted_data = await cryption.aes.decrypt(encryption_key, encrypted_data, iv);

    // We convert the decrypted data to a string.
    const decrypted_data_string = await cryption.buffer.to("utf8", decrypted_data);

    // We authenticate the data using the authentication key.
    const authentication_tag_of_decrypted_data = await cryption.signatures.sign(authentication_key, Buffer.from(encrypted_data), "HMAC");

    // We compare the authentication tags.
    assert(authentication_tag === authentication_tag_of_decrypted_data); // If the authentication tags match, the data is correct, you can use it.

    // We can also compare the decrypted data with the original data. They should be the same.
    assert(decrypted_data_string === data);
}
