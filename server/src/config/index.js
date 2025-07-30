import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });


const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    dbURL: process.env.MONGODB_URI,
    clientUrl: process.env.CLIENT_URL,
    imgEndPoint: process.env.IMAGE_KIT_ENDPOINT,
    imgPubKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    imgPrivKey: process.env.IMAGE_KIT_PRIVATE_KEY,
};


export default config;