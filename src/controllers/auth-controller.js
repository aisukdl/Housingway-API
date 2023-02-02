const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const {User} = require('../models')
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