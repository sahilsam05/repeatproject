// const jwt = require(`jsonwebtoken`);
// const fs = require(`fs`);
//
// const publicKey = fs.readFileSync(`./config/public.pem`, `utf8`);
//
// module.exports = function (req, res, next) {
//     let authHeader = req.headers[`authorization`];
//
//     if (!authHeader) {
//         return res.json({ errorMessage: `No token provided` });
//     }
//
//     let token = authHeader.replace(`Bearer `, ``);
//
//     jwt.verify(token, publicKey, { algorithms: [`RS256`] }, function (err, decoded) {
//         if (err) {
//             return res.json({ errorMessage: `Invalid token` });
//         }
//
//         req.user = decoded; // { name, accessLevel, iat }
//         next();
//     });
// };
