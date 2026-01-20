const router = require(`express`).Router();
const usersModel = require(`../models/users`);
const bcrypt = require(`bcryptjs`);

// const jwt = require(`jsonwebtoken`);
// const fs = require(`fs`);

// const privateKey = fs.readFileSync(`./config/private.pem`, `utf8`);

// REGISTER new user (Derek-style URL params)
router.post(`/users/register/:name/:email/:password`, async (req, res) => {
    try {
        const { name, email, password } = req.params;

        const existingUser = await usersModel.findOne({ email: email });
        if (existingUser) {
            return res.json({ errorMessage: `User already exists` });
        }

        bcrypt.hash(
            password,
            parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS || `3`),
            async (err, hash) => {
                if (err) {
                    return res.json({ errorMessage: `Failed to encrypt password` });
                }

                try {
                    const user = await usersModel.create({
                        name: name,
                        email: email,
                        password: hash,
                        accessLevel: parseInt(process.env.ACCESS_LEVEL_CUSTOMER || `1`)
                    });

                    res.json({ name: user.name, accessLevel: user.accessLevel });
                } catch (createErr) {
                    res.json({ errorMessage: `User was not registered` });
                }
            }
        );
    } catch (err) {
        res.json({ errorMessage: `User was not registered` });
    }
});

// LOGIN user (Derek-style URL params) + JWT
router.post(`/users/login/:email/:password`, async (req, res) => {
    try {
        const { email, password } = req.params;

        const user = await usersModel.findOne({ email: email });
        if (!user) {
            return res.json({ errorMessage: `User not found` });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.json({ errorMessage: `Error checking password` });
            }

            if (!result) {
                return res.json({ errorMessage: `Password is incorrect` });
            }

            // // Create JWT using private.pem (RS256)
            // const token = jwt.sign(
            //     {
            //         name: user.name,
            //         accessLevel: user.accessLevel
            //     },
            //     privateKey,
            //     { algorithm: `RS256` }
            // );

            res.json({
                name: user.name,
                accessLevel: user.accessLevel,
                // token: token
            });
        });
    } catch (err) {
        res.json({ errorMessage: `Login failed` });
    }
});

module.exports = router;
