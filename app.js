if(process.env.NODE_ENV != "production"){
require("dotenv").config()
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const session =require("express-session");
const flash=require("express-flash");
const passport=require("passport");
const LocalStrategy = require("passport-local");
const User=require("./models/user.js");
const mongoStore=require("connect-mongo");
const MongoStore = require("connect-mongo");

// Set EJS and middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));


// Connection
const dbUrl=process.env.ATLASDB_URL
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

//session
const store=MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET
  },
  touchAfter:24*3600,
})

store.on("error",()=>{
  console.log("ERROR IS IN MONGO STORE ",err);
})
const sessiomOption={
  store:store,
  secret:process.env.SECRET,
  resave:false , 
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+1000*60*60*24*7,
    maxAge:1000*60*60*24*7,
    httpOnly:true,
  }
}


app.use(session(sessiomOption));
app.use(flash());
//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currentUser = req.user;
  next();
})
app.get("/demo",async(req,res)=>{
  let fakeUser=new User(
    {
      email:"student@gmail.com",
      username:"delta-student"
    }
  );
  let registeredUser=await User.register(fakeUser,"helloworld");
  res.send(registeredUser);
})
//routes file 
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);


//404 route
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "page not found"))
})
//default error handler that print
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong!" } = err;
  return res.status(statusCode).render("error.ejs", { err });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});