const express    = require('express');
const router     = express.Router();
const axios      = require('axios');

router.get('/cat', (req, res) => {
    function errorHandler(err){
        res.render('404',{err:err.message});
    }

    axios.all([
        axios.get("https://api.thecatapi.com/v1/images/search").catch(errorHandler),
        axios.get("https://api.thecatapi.com/v1/images/search?limit=1&page=10&order=Desc").catch(errorHandler),
        axios.get("https://catfact.ninja/fact?max_length=100").catch(errorHandler)
    ])
    .then(axios.spread((randCatImages, nextCatImages, catFacts) =>{
        res.render('cat',{randCatImages: randCatImages.data, nextCatImages:nextCatImages.data, catFacts:catFacts.data.fact});
    })); 
});

router.get('/dog', (req, res) =>{
    function errorHandler(err){
        res.render('404',{err:err.message});
    }

    axios.all([
        axios.get("https://api.thedogapi.com/v1/images/search").catch(errorHandler),
        axios.get("https://api.thedogapi.com/v1/images/search?limit=1&order=Desc").catch(errorHandler),
        axios.get("http://dog-api.kinduff.com/api/facts").catch(errorHandler)
    ])
    .then(axios.spread((randDogImages,nextDogImage,dogFacts) =>{
        res.render('dog', {randDogImages:randDogImages.data, nextDogImage:nextDogImage.data, dogFacts:dogFacts.data});
    }));
});

module.exports = router;