import config from '../config/index.js';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
    urlEndpoint: config.imgEndPoint,
    publicKey: config.imgPubKey,
    privateKey: config.imgPrivKey
});

export default imagekit;