const router = require("express").Router();
const User = require("../schema").user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const admin_auth = require("./middleware/admin_auth");

router.get("/table-data", admin_auth, async (req, res) => {
    const users = await User.find({}, { uid: 0 });
    if (!users) res.json({ data: [] });
    else res.json({ data: users });
});


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


router.post("/set-active", admin_auth, async (req, res) => {
    const { active, selected } = req.body;
    await User.updateMany({ _id: { $in: selected } }, { active: active });
    const users = await User.find({}, { uid: 0 });
    res.json({ success: true, data: users });
});

router.post("/set-admin", admin_auth, async (req, res) => {
    const { admin, selected } = req.body;
    await User.updateMany({ _id: { $in: selected } }, { admin: admin });
    const users = await User.find({}, { uid: 0 });
    res.json({ success: true, data: users });
});



router.post("/logout-admin", admin_auth, async (req, res) => {
    return res
        .clearCookie("access_token_admin")
        .status(200)
        .json({ message: "Successfully logged out" });
});


module.exports = router;