import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });


const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    dbURL: process.env.MONGODB_URI ?? `mongodb://127.0.0.1:27017/chatgpt-clone`,
};


export default config;