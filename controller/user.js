const User=require("../models/user");

module.exports.signUpForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signUp=async(req,res)=>{
    try{
    let {username,password,email}=req.body;
    let newUser= new User({email,username});
    let registerUser = await User.register(newUser,password);
    console.log(registerUser);
    req.login(registerUser,(err)=>{
    if(err){
      next(err);
    }
     req.flash("success","user registered successfully");
     res.redirect("/listings");
    });
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup")
    }
}

module.exports.loginUpForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req, res) => {
    req.flash("success", `Welcome back to Roomconnect`);
    let redirectUrl =res.locals.redirectUrl || "/listings" ; 
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res)=>{
  req.logOut((err)=>{
    if(err){
      next(err);
    }
    else{
      req.flash("success","you logged out");
      res.redirect("/listings")
    }
  })
}