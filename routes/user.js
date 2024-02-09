const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { ObjectId } = require('mongoose').Types;

router.get('/', async (req, res) => {
    try {
        const users = await User.find().exec();

        if(!users) return res.status(400).json({
            message : "Bad request", 
            error
        })

        res.status(200).json(users)
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
});

router.get('/findById', async (req, res) => {
    try {
        const id = req.body.id || req.body._id;

        if(!ObjectId.isValid(id)) return res.status(400).json({
            message: "Bad request",
        });

        const user = await User.findById(id).exec();

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                user,
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});

router.get('/findById/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if(!ObjectId.isValid(id)) return res.status(400).json({
            message: "Bad request",
        });

        const user = await User.findById(id).exec();

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});

router.get('/findUserIdByName', async (req, res) => {
    try {
        const user = await User.exists({ name: req.body.name }).exec();

        user !== null
            ? res.status(200).json(user)
            : res.status(404).json({
                  message: 'Not found',
                  user,
              });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});

router.post('/addUser', async (req, res) => {
    try {
        const user = await User.create(req.body).catch((error) => error);

        if (user.errors)
            return res.status(400).json({
                message: 'Bad request',
                ...user,
            });

        res.status(201).json({
            message: 'New user added',
            userAdded: user,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});

router.patch('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if(!ObjectId.isValid(id)) return res.status(400).json({
            message: "Bad request",
        });

        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        }).exec();

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        res.status(200).json({
            message: 'User updated',
            user,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});

router.delete('/deleteUser', async (req, res) => {
    try {
        const id = req.body.id || req.body._id;

        if(!ObjectId.isValid(id)) return res.status(400).json({
            message: "Bad request",
        });

        const user = await User.findOneAndDelete({_id: id}).exec();

        res.status(200).json({
            message: 'User deleted',
            user
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});

module.exports = router;
