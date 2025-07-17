//require express mongoose
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const Listing=require("./models/listing.js")
const path =require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate")

//connect to data base
main()
    .then((res) => { console.log("succesfully connected to db") })
    .catch((err) => { console.log(err) });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/roomConnects");
}

//starting server
app.listen(port, () => {
    console.log("server is listining");
});
//ejs
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")))

//Api's
app.get("/", (req, res) => {
    res.send("wroking");
})

// app.get("/testlisting", async (req, res) => {
//    let sampleListing= new Listing({
//     title:"new villa",
//     description:"by the village",
//     price:1200,
//     location:"goa",
//     country:"India"
//    });
//    await sampleListing.save();
//    res.send("succesfull");
// })


//INDEX ROUTE
app.get("/listings",async(req,res)=>{
   const lists=await Listing.find({});
   res.render("listings/index.ejs",{lists});
});

//CREATE ROUTE
app.get("/listings/new" ,(req,res)=>{
    res.render("listings/new.ejs");
});

//SHOW ROUTE
app.get("/listings/:id",async(req,res)=>{
    let {id} =req.params;
    let listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})


//ADD route
app.post("/listings",async(req,res)=>{
    const newlisting= new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
})

// EDIT ROUTE 
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});
//update route
app.put("/listings/:id",async(req,res)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect(`/listings/${id}`);
})
//delete route
app.delete("/listings/:id",async( req,res)=>{
    let {id}=req.params;
    let deletelisting = await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    res.redirect("/listings")
})