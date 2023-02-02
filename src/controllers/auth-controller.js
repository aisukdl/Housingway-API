const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const {User} = require('../models')
const jwt = require('jsonwebtoken');
require('dotenv');


exports.register = async (req,res,next) => {
    try {
        const value = req.body;
        // const user = await User.findOne({
        //     where: {
        //         username: value.username || ''
        //     }
        // });
        // if (user){
        //     //create error message
        // }

        value.password = await bcrypt.hash(value.password, 12);
        await User.create(value);
        res.status(201).json({message:'register success'});
    } catch(err) {
        next(err);
    }
}

exports.login = async (req,res,next) => {
    try {
        const value = req.body;
        const user = await User.findOne({
            where: {
                username: value.username
            }
        });
        // if (!user){
        //     //create error
        // }

        const isCorrect = await bcrypt.compare(value.password, user.password);
        if (!isCorrect) {
            //create error message
        }

        const accessToken = jwt.sign(
            {
                id : user.id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );
        res.status(200).json({ accessToken })
    } catch (err) {
        next(err)
    }
}