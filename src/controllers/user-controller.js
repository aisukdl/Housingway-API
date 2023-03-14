// const {User} = require('../models')
// const createError = require('../utils/create-error')
// exports.getUserInfoById = async (req,res,next) => {
//     try {
//         const user = await User.findOne({
//             where: {
//                 id : req.params.userId
//             },
//             attributes: {
//                 exclude: ['password']
//             }
//         })
//         if (!user) {
//             createError('user is not found', 400);
//           }
//     } catch(err){
//         next(err)
//     }
// }