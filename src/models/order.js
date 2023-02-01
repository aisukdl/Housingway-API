const { STATUS_PENDING,STATUS_CANCELLED,STATUS_COMPLETED,STATUS_WIP } = require('../config/constant');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      status: {
        type: DataTypes.ENUM(STATUS_PENDING,STATUS_CANCELLED,STATUS_COMPLETED,STATUS_WIP),
        allowNull: false,
        defaultValue: STATUS_PENDING
      }
    },
    { underscored: true }
  );

  Order.associate = db => {
    Order.belongsTo(db.User, {
        foreignKey: {
            name: 'userId',
            allowNull: false
          },
      onDelete: 'RESTRICT'
    });
    Order.belongsTo(db.Server,{
      foreignKey:{
        name: 'serverId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });
    Order.belongsTo(db.Service,{
      foreignKey: {
        name: 'serviceId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    })
    Order.hasOne(db.Comment,{
      foreignKey: {
        name: "orderId",
        allowNull: false
      }
    })
  };

  return Order;
};
