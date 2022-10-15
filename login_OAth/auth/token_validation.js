const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) =>{
        let token = req.get("authorization");
        if (token){
            token = token.slice(7);
            verify(token, "abc123", (err, decode) => {
                if (err){
                    res.json({
                        success: 0,
                        message: "Invalid token supplied"
                    });
                }else{
                    next();
                }
            });
        }else{
            res.json({
                success: 0,
                message: "Access denied"
            });
        }
    }
}