const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

router.post('/newArticle', async (req, res) => {
    const article = await Blog.create(req.body);
    res.status(201).json(article)
})

module.exports = router;