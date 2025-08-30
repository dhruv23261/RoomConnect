const express=require("express");
const router=express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/warpAsync.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controller/listing.js");
const multer  = require('multer')
const{storage}=require("../cloudConfig.js");
const upload = multer({ storage })

//Index route//create route
router.route("/")
.get(wrapAsync(listingController.index))
.post( isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createRoute));

//New Listing Route
router.get("/new",isLoggedIn,(listingController.newListing));

//show route// update route//delete route 
router.route("/:id")
.get(wrapAsync(listingController.showRoute))
.put( isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateRoute))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteRoute))

//edit route
router.get("/:id/edit",isLoggedIn ,isOwner,wrapAsync(listingController.editRoute));

module.exports=router;