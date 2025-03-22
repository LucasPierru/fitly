'use server';

import { Storage } from '@google-cloud/storage';
import path from 'path';

const storage = new Storage({
  keyFilename: path.resolve('./config/fitly-453801-82e97582bf97.json')
});
const bucket = storage.bucket('fitly-meals');

export default async function getImage(filePath: string, name: string) {
  try {
    const [url] = await bucket.file(`${filePath}/${name}`).getSignedUrl({
      action: 'read',
      expires: Date.now() + 60 * 60 * 1000 // 1 hour expiry
    });

    return { url, error: null };
  } catch (error) {
    return { url: null, error };
  }
}
