const express=require("express");
const router=express.Router();
const User=require("../models/user");
const wrapasync=require("../utils/warpAsync");
const passport =require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controller/user.js")
//signform
router.route("/signup")
.get((userController.signUpForm))
.post(wrapasync(userController.signUp))

//loginForm
router.route("/login")
.get((userController.loginUpForm))
.post(saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  (userController.login)
);
//logout
router.get("/logout",(userController.logout));

module.exports=router;