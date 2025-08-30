const Listing=require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const Review=require("./models/review.js")
const { ListingSchema} = require("./schema.js");
const { ReviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; 
    req.flash("error", "You must be logged in to create listings");
    return res.redirect("/login"); 
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if(req.session.redirectUrl){
  res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};


module.exports.isOwner=async(req,res,next)=>{
   let { id } = req.params;
  let listing = await Listing.findById(id);

  if (!listing.owner._id.equals(res.locals.currentUser._id)) {
    req.flash("error", "You do not have permission to do this");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validateListing = (req, res, next) => {
  const { error } = ListingSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg)
  }
  else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = ReviewSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg)
  }
  else {
    next();
  }
};

module.exports.isAuthor=async(req,res,next)=>{
   let { id } = req.params;
   let { reviewId } = req.params;
  let review = await Review.findById(reviewId);

  if (!review.author._id.equals(res.locals.currentUser._id)) {
    req.flash("error", "You do not have permission to do this");
    return res.redirect(`/listings/${id}`);
  }
  next();
}