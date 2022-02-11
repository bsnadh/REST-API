const express = require('express');
const { route } = require('express/lib/application');
const Post = require('../models/Post')
const router = express.Router();

// get data
router.get('/', async (req, res) => {
    await Post.find({})
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).send(error)
            console.log(error)
        })
})

// get specific data
router.get('/:postId', async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        res.json(post)
    } catch (error) {
        res.json({ message: error })
        console.log(error)
    }
})

// post data
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    console.log(req.body)
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (error) {
        console.log(error)
        res.json({ message : error })
    }
        
})

// remove/delete data
router.delete('/:postId', async (req, res) => {
    try {
        await Post.deleteOne({_id : req.params.postId})
        res.send("the post is deleted")
    } catch (error) {
        res.status(500).send({message : error})
    }
})

// update a part of the data -- patch

router.patch('/postId', async (req, res) => {
    try {
        const updated = await Post.updateOne({_id:req.params.postId},
                                            { $set: { title:req.body.title } })
        res.json(updated)
    } catch (error) {
        res.status(500).send({message : error})
    }
})
module.exports = router;