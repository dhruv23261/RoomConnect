const express=require("express");
const router=express.Router({mergeParams: true});
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/warpAsync.js");
const{validateReview,isLoggedIn, isAuthor, saveRedirectUrl}=require("../middleware.js")

const reviewController=require("../controller/review.js")

// review post request
router.post("/",isLoggedIn,validateReview,wrapAsync( reviewController.postReview));
//delete review route
router.delete("/:reviewId",isLoggedIn,isAuthor,saveRedirectUrl, wrapAsync(reviewController.deleteReview));


module.exports =router;
