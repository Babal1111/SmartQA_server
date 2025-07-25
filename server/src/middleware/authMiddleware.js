const jwt = require('jsonwebtoken');
const Users  = require('../models/Users');
const secret = process.env.JWT_SECRET;

const authMiddleware = {
    protect: async(request,response,next)=>{
        try {
            const token = request.cookies?.jwtToken;
            if(!token) return response.status(401).json({ message: 'Unauthorized' });

            const user = jwt.verify(token,secret);

            if(user){
                request.user = await  Users.findById({_id: user.id});
            }
            else{
                return response.status(401).json({ message: 'invalid token' });
            }
            // request.user = user;
            next();

        } catch (error) {

            response.status(401).json({ message: 'Unauthorized' });
        }
    }
}
module.exports = authMiddleware;