import * as crypto from 'crypto';


export async function generatehmac(key: string, data: string): Promise<string> {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(data);
    return hmac.digest('hex');
}

export async function verifyhmac(key: string, data: string, signature: string): Promise<boolean> {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(data);
    return hmac.digest('hex') === signature;
}
