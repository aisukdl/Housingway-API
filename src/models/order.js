const { 
  STATUS_PENDING,
  STATUS_CANCELLED,
  STATUS_COMPLETED,
  STATUS_WIP,
  TYPE_FC,
  TYPE_PRIVATE 
} = require('../config/constant');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      status: {
        type: DataTypes.ENUM(STATUS_PENDING,STATUS_CANCELLED,STATUS_COMPLETED,STATUS_WIP,'REJECTED'),
        allowNull: false,
        defaultValue: STATUS_PENDING
      },
      houseType: {
        type:DataTypes.ENUM(TYPE_FC,TYPE_PRIVATE),
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW')
      }
    },
    { 
      underscored: true,
      timestamps: false
    }
  );

  Order.associate = db => {
    Order.belongsTo(db.User, {
        foreignKey: {
            name: 'userId',
            allowNull: false
          },
      onDelete: 'CASCADE'
    });
    Order.belongsTo(db.Server,{
      foreignKey:{
        name: 'serverId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
    Order.belongsTo(db.Service,{
      foreignKey: {
        name: 'serviceId',
        allowNull: false,
        primaryKey: true
      },
      onDelete: 'CASCADE'
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
