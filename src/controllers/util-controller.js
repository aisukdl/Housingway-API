const {Server} = require('../models')
const createError = require('../utils/create-error')
exports.getAllServers = async (req,res,next) => {
    try {
        const server = await Server.findAll()
  
        if (!server) {
            createError('error fetching serverlist', 400);
          }
  
          res.status(200).json({server});
    } catch(error) {
        next(error)
    }
    
  }