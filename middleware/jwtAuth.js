import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

const env = dotenv.config().parsed

const jwtAuth = () => {
    return async (req, res, next) => {
        try {
            if (!req.headers.authorization) { throw { code: 401, message: 'UNAUTHORIZED' } }

            const token = req.headers.authorization.split(' ')[1]
            const decoded = jsonwebtoken.verify(token, env.JWT_ACCESS_TOKEN_SECRET)
            req.jwt = decoded // sekarang kita punya req.jwt dari data user yang telah login

            next() // Continue to next another middleware / controller
        } catch (err) {
            const errorJwt = ['invalid signature', 'jwt malformed', 'jwt must be provided', 'invalid token'];

            if (err.message == 'jwt expired') {
                err.message = 'ACCESS_TOKEN_EXPIRED';
            } else if (errorJwt.includes(err.message)) {
                err.message = 'INVALID_ACCESS_TOKEN';
            }

            return res.status(err.code || 500).json({
                status: false,
                message: err.message
            });
        }
    }
}

export default jwtAuth