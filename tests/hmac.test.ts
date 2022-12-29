import * as crypto from 'crypto';
import { sign_with, verify_with } from '../core/digital_signatures';
import { generate_hmac_key } from '../core/generate_keys';
import { export_symmetric_key } from '../helpers/utils';

describe('Digital Signature Test', () => {

    describe('HMAC Test', () => {
        test('Generate HMAC Key', async () => {
            const keydata = await generate_hmac_key();
            const key = await export_symmetric_key(keydata);
            expect(key).toBeDefined();
        });

        test('Verify HMAC Signature ', async () => {
            const keydata = await generate_hmac_key();

            const data = Buffer.from(new String('Hello World'));
            const signature = await sign_with(keydata, data, 'hmac')
            const is_verified = await verify_with(keydata, data, 'hmac', Buffer.from(signature));
            expect(is_verified).toBeTruthy();

            const data_2 = Buffer.from(new String('Hello World, again. The verification should fail i.e. is_verified_2 should be false.'));
            const is_verified_2 = await verify_with(keydata, data_2, 'hmac', Buffer.from(signature), 'sha256');
            console.log(`Signature: ${signature} | is_verified: ${is_verified}  | data: ${data}`)
            expect(is_verified_2).toBeFalsy();
        });
    });

});