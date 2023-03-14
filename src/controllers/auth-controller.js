const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const {User} = require('../models')
const jwt = require('jsonwebtoken');
require('dotenv');
const createError = require('../utils/create-error');
const { validateRegister, validateLogin } = require('../validators/auth-validators')


exports.register = async (req,res,next) => {
    try {
        const value = validateRegister(req.body);
        const user = await User.findOne({
            where: {
               [Op.or]: [{username: value.username || ''},{email: value.email}]
            }
        });
        if (user){
            createError('email or username is already in use', 400);
        }

        value.password = await bcrypt.hash(value.password, 12);
        await User.create(value);

        res.status(201).json({message:'register success'});
    } catch(err) {
        next(err);
    }
}

exports.login = async (req,res,next) => {
    try {
        const value = validateLogin(req.body);
        const user = await User.findOne({
            where: {
                username: value.username
            }
        });
        if (!user){
            createError('invalid username or password', 400);
        }
        const isCorrect = await bcrypt.compare(value.password, user.password);
        if (!isCorrect) {
            createError('invalid username or password',400)
        }

        const accessToken = jwt.sign(
            {
                id : user.id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                role: user.role
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

exports.getMe = (req, res, next) => {
    res.status(200).json({ user: req.user });
  };