const express = require('express');
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb+srv://newUser:Jemima2308@restaurantdatabase.ewvkm.mongodb.net/RestaurantDatabase?retryWrites=true&w=majority', 
{useNewUrlParser:true, useUnifiedTopology:true}, ()=>{
    console.log("mongoose is connected")
});

const Restaurant = mongoose.model('Restaurant',{
    id: mongoose.Schema.Types.ObjectId,
    cuisine: {type: String, required:true},
    name: {type: String, required:true},
    city: {type: String, required:true},
    restaurantId: {type: String, required:true}

})
module.exports = {
    url: "https://drive.google.com/file/d/1ON-ARc3cHHb45zi1att3StiP9Y37MIEG/view?usp=sharing"
}
 app.post('/restaurants/create', async function(req, res){
     const {cuisine,name,city,restaurantId} = req.body
     try{
     const newRestaurant = new Restaurant({cuisine,name,city,restaurantId})
    await newRestaurant.save()
     }catch(err){
         res.json({
        method: "POST",
        response: "",
        error: err.message
     })}
 })
app.get('/restaurants/cuisine/:cuisine', async(req, res)=>{
    const cuisineId = req.params.cuisine
    try {
        
        if (doc){
            const docs = await Restaurant.find({cuisineId})
            return res.json({
                status: 200,
                response: docs
            })
        }
    }catch(err){
        res.json({
       method: "POST",
       response: "",
       error: err.message
    })}
    
})

app.get('/restaurants', async(req, res)=>{
    const sortBy = req.query.sortBy
    try {
        
        if (doc){
            const docs = await Restaurant.find({}).sort({restaurantId: sortBy})
            return res.json({
                status: 200,
                response: docs
            })
        }
    }catch(err){
        res.json({
       method: "POST",
       response: "",
       error: err.message
    })}
    
})

app.get('/restaurants/:cuisine', async(req, res)=>{
    const cuisine = req.params.cuisine
    try{
        const document = await Restaurant.find({cuisine}).where({city}).ne("Brooklyn")
        return res.json({
            status: 200,
            response: docs
        })
    } catch(err){
        res.json({
        method: "POST",
        response: "",
        error: err.message
    })}
})




const port = 3000
app.listen(port,function(){
    console.log('listening on port', port)

})