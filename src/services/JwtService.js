const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// token
const genneralAccessToken = (payload) => {
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '120s'})

    return access_token;
}

// refresh_token
const genneralRefreshToken = (payload) => {
    const access_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d'})

    return access_token;
}

const refreshTokenService = (token) => {
    return new Promise(async(resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
                if(err) {
                    resolve({
                        status: 'ERROR',
                        message: 'The authentication'
                    })
                }
                const { payload } = user
                const access_token = genneralAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    access_token
                })
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenService
}