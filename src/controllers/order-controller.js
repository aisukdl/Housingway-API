const {Order,Comment,Service,User,Server} = require('../models');
const createError = require('../utils/create-error');
exports.getAllOrdersByUserId = async (req,res,next) => {
    try {
        const order = await Order.findAll({
            include: [
              {model : Comment},
              {model : Service},
              {model : User},
              {model: Server}
            ],
            where : {
                userId: req.user.id
            }
        })

        if (!order) {
            createError('no order history', 400);
          }

          res.status(200).json({order});
    } catch(error) {
        next(error)
    }
    
}

exports.getOrderByOrderId = async (req,res,next) => {
    try {
        const order = await Order.findAll({
            include: [
              {model : Comment},
              {model : Service}
            ],
            where: [
              {id : req.params.orderId},
              {user_id: req.user.id}]
        })

        if (!order){
            createError(`your order number ${req.params.orderId} not found`)
        }

        res.status(200).json({order});

    } catch(error) {
        next(error)
    }
   
}

exports.createOrder = async (req, res, next) => {
    try {
      const { houseType, interiorId, exteriorId, serverId, comment } = req.body;
      const userId = req.user.id;
  
      // Validate input data
      if (!houseType || !serverId) {
        return res.status(400).json({ error: 'Bad request' });
      }
  
      let order;
      let createdOrder = false;
      let serviceIds = [];
      const interiorIdNum = Number(interiorId);
      const exteriorIdNum = Number(exteriorId);
      if (interiorIdNum !== 0) {
        serviceIds.push(interiorIdNum);
      }
      if (exteriorIdNum !== 0) {
        serviceIds.push(exteriorIdNum);
      }
  
      for (const serviceId of serviceIds) {
        if (!createdOrder) {
          order = await Order.create({
            userId,
            houseType,
            serviceId,
            serverId,
          });
    
          if (!order) {
            return res.status(400).json({ error: 'Failed to create Order' });
          }
    
          createdOrder = true;

          try {
            addedComment = await Comment.create({ orderId: order.id, comment, userId });
          } catch (err) {
            await order.destroy();
            return res.status(400).json({ error: 'Failed to create Comment' });
          }

        } else {
          const newOrder = await Order.create({
            id: order.id,
            userId,
            houseType,
            serviceId,
            serverId,
          });
    
          if (!newOrder) {
            await order.destroy();
            await addedComment.destroy();
            return res.status(400).json({ error: 'Failed to create Order' });
          }
        }
      }
  
      res.status(201).json({ message: 'Order sent' });
    } catch (err) {
      next(err);
    }
  };
  
exports.deleteOrder = async (req,res,next) => {
    try{
        const totalDelete = await Order.destroy({
            where: {
                id : req.params.orderId,
                userId: req.user.id,
                status : 'PENDING'
            }
          });
      
          if (totalDelete === 0) {
            createError('no order has been deleted', 400);
          }

        res.status(201).json({message:'Deleted complete'});

    } catch(err){
        next(err)
    }
}

  
exports.getAllOrders = async (req,res,next) => {
  try {
      const order = await Order.findAll({
        include: [
          {
            model: User,
            required: true
          },
          {
            model: Service,
            required: true
          },
          {
            model: Server,
            required: true
          }
        ]
      })

      if (!order) {
          createError('no order history', 400);
        }

        res.status(200).json({order});
  } catch(error) {
      next(error)
  }
  
}

exports.updateStatus = async (req,res,next) => {
  const {status} = req.body;
  const {orderId} = req.params;
    if (req.user.role !== 'ADMIN') {
      return res.status(401).json({message: "you are unauthorized"})
    }
    Order.update(
      { status: status },
      { where: { id: orderId } }
    )
    .then(numRowsUpdated => {
      res.status(200).json({message: "updated completed"})
    })
    .catch(err => {
      console.error(err);
    });
    
}
