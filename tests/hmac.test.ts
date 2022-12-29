import * as crypto from 'crypto';
import { generatehmac, verifyhmac } from '../core/mac';
import { generateAESKey } from '../core/symmetric';
import { export_symmetric_key } from '../helpers/utils';

describe('Message Authentication Code Test', () => {
    test('Generate HMAC', async () => {
        const keydata = await generateAESKey(256, true, 'AES-GCM');
        const key = await export_symmetric_key(keydata);
        const data = 'Hello World';
        const hmac = generatehmac(key, data);
        expect(hmac).toBeDefined();
    });

    test('Verify HMAC', async () => {
        const keydata = await generateAESKey(256, true, 'AES-GCM');
        const key = await export_symmetric_key(keydata);

        const data = 'Hello World';
        const hmac = await generatehmac(key, data);
        const verified = await verifyhmac(key, data, hmac);
        expect(verified).toBeTruthy();

        const data2 = 'Hello World2';
        const verified2 = await verifyhmac(key, data2, hmac); // should be false because data2 is different
        expect(verified2).toBeFalsy();
    });
});
