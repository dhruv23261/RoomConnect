const mongoose= require ("mongoose");
const initdata =require("./data.js");
const Listing =require("../models/listing.js");

//connect to data base
main()
    .then((res) => { console.log("succesfully connected to db") })
    .catch((err) => { console.log(err) });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/roomConnects");
}

const initDb=async ()=>{
 await Listing.deleteMany({});
 await Listing.insertMany(initdata.data);
 console.log("data was initilized");
}

initDb()