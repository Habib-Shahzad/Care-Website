const router = require("express").Router();
const User = require("../schema").user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/loggedIn", async (req, res, next) => {

    const admin_token = (req.cookies?.['access_token_admin']);
    let admin_user = null;

    if (admin_token) {
        const admin_data = jwt.verify(admin_token, process.env.TOKEN_SECRET);
        admin_user = await User.findOne({ _id: admin_data.user_id });
    }

    res.json({
        successAdmin: admin_user != null,
        admin_user: admin_user
    });

    next();
});



router.post("/admin-login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate if user exist in our database
        const user = await User.findOne({ email });


        if (!user.admin) {
            return res.json({ success: false, data: null, message: "User is not an admin" });
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: "7000h",
                }
            );

            // save user token
            user.token = token;

            res.cookie("access_token_admin", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 7,
            })
                .status(200)
                .json({
                    success: true,
                    data: user
                });
        }
        else {
            res.json({ success: false, data: null, message: "Email and Password do not match!" });
        }
    } catch (err) {
        console.log(err);
        res.json({ data: null, success: false, message: "User not found!" });
    }
});


module.exports = router;