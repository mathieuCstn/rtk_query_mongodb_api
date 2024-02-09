const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();
const { ObjectId } = require('mongoose').Types;

router.post('/newArticle', async (req, res) => {
    const article = await Blog.create(req.body);
    res.status(201).json(article);
});

router.get('/article/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id))
            return res.status(400).json({
                message: 'Bad request',
            });
        const articles = await Blog.findById(id).exec();
        if (!articles)
            return res.status(404).json({
                message: 'Article not found',
            });
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});

module.exports = router;
