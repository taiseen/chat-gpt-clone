import api from ".";

const imgAuthenticator = async () => {

    try {
        const response = await api.get(`/api/upload`);

        const { signature, expire, token } = response.data;

        return { signature, expire, token };

    } catch (error) {
        throw new Error(`🟥🟥🟥 Img authentication request failed: ${error.message}`);
    }
};

export default imgAuthenticator;