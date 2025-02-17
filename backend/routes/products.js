const { Router } = require('express');
const router = Router();
const Food = require('../models/Food');

router.post('/post', (req,res)=>{
    res.send("Hello");
})

router.get('/getFood', async (req, res) => {
    let products = await Food.find();
    if (products.length > 0) {
        res.send(products);
        console.log(products)
    } else {
        res.send({ result: "No Products Found" })
    }
});

router.post('/addFood', async (req, res) => {

    const { categoryName ,name, img, options, description } = req.body;
    try {
        Food.create({ categoryName:categoryName ,name: name,  img: img, options:options , description:description });
        res.status(200).send({ Status: "ok" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});

module.exports = router;