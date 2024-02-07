const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/addUser', async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json({
        message: 'New user added',
        userAdded: user,
    });
});

router.get('/findById', async (req, res) => {
    // const user = await User.findOne({id: req.body.id}).exec()
    const user = await User.findById(req.body._id).exec()
        .catch((error) => {
            res.status(404).json({
                message: 'Not found',
                error
            })
        });
    
    res.status(200).json(user);
});

router.get('/findUserIdByName', async (req, res) => {
    const user = await User.exists({name: req.body.name}).exec()
        .catch((error) => {
            res.status(400).json({
                message: 'Bad request',
                error
            })
        });

    user !== null ? res.status(200).json(user) : res.status(404).json({
        message: 'Not found'
    });
})

module.exports = router;
