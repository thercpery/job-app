const jwt = require("jsonwebtoken");
const secret = "JJRf_zBwH|Y7Hrq";

module.exports.createAccessToken = (user) => {
    const data = {
        id: user.id,
        username: user.username,
        email: user.email,
        is_admin: user.is_admin,
        is_hired: user.is_hired,
        company_id: user.company_id
    };
    return jwt.sign(data, secret, {});
};

module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;
    if(typeof token !== "undefined"){
        token = token.slice(7, token.length);
        return jwt.verify(token, secret, (err, data) => {
            if(err){
                return res.send({auth: "failed"});
            }
            else{
                next();
            }
        });
    }
    else{
        return res.send({auth: "failed"});
    }
};
module.exports.decode = (token) => {
    if(typeof token !== "undefined"){
        token = token.slice(7, token.length);

        return jwt.verify(token, secret, (err, data) => {
            if(err){
                return null;
            }
            else{
                return jwt.decode(token, {complete: true}).payload;
            }
        });
    }
    else{
        return null;
    }
};