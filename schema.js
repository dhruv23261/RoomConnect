const joi=require("joi");
module.exports.ListingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        price:joi.number().required().min(0),
        location:joi.string().required(),
        country:joi.string().required(),
        image:joi.string().allow("",null),
    }).required(),
})
module.exports. ReviewSchema=joi.object({
    review:joi.object({
    rating:joi.number().required().min(0).max(5),
    comment:joi.string().required()
    }).required(),
})