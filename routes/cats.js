const express = require('express')
const router = express.Router()
router.use(express.json())
const cats = require('../models/cats')


router.get('/', async (req, res) => {
    try {
        const cat = await cats.find()
        res.json(cat);
    } catch (err) {
        res.json({ message: err.message })
    }
})
// get req with catid and catname
router.get('/:param', async (req, res) => {
    try {
        var cat = await cats.find({ catid: req.params.param })
        if (cat.length == 0) {
            cat = await cats.find({ catname: req.params.param })
        }
        res.json(cat);
    } catch (err) {
        res.json({ message: err.message })
    }
})
router.post('/', (req, res) => {
    const cat = new cats({
        catid: req.body.catid,
        catname: req.body.catname,
    })
    cat.save().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: err.message })
    })
})
router.put('/:param', async (req, res) => {
    try {
        var cat = await cats.find({ catid: req.params.param })
        if (cat.length == 0) {
            const catsUpdate = await cats.findOneAndUpdate({
                catname: req.params.param
            },
                {
                    $set: {
                        catid: req.body.catid,
                        catname: req.body.catname
                    }
                },
                { new: true })
            res.json(catsUpdate);
        }
        else {
            const catsUpdate = await cats.findOneAndUpdate({
                catid: req.params.param
            },
                {
                    $set: {
                        catid: req.body.catid,
                        catname: req.body.catname
                    }
                },
                { new: true })
            res.json(catsUpdate);
        }
    } catch (err) {
        res.json({ message: err.message })
    }
})
router.delete('/:param', async (req, res) => {
    try {
        var cat = await cats.find({ catid: req.params.param })
        if (cat.length == 0) {
            const catsDelete = await cats.findOneAndDelete({
                catname: req.params.param
            })
            res.json(catsDelete)
        } else {
            const catsDelete = await cats.findOneAndDelete({
                catid: req.params.param
            })
            res.json(catsDelete)
        }
    } catch (err) {
        res.json({ message: err.message })
    }
})

    module.exports = router