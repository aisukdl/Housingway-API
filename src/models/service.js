const { 
    SERVICE_EXTERIOR_LARGE,
    SERVICE_EXTERIOR_MEDIUM,
    SERVICE_EXTERIOR_SMALL,
    SERVICE_INTERIOR_LARGE,
    SERVICE_INTERIOR_MEDIUM,
    SERVICE_INTERIOR_SMALL,
    TYPE_FC,
    TYPE_PRIVATE,
    PRICE_EXTERIOR_LARGE,
    PRICE_EXTERIOR_MEDIUM,
    PRICE_EXTERIOR_SMALL,
    PRICE_INTERIOR_LARGE,
    PRICE_INTERIOR_MEDIUM,
    PRICE_INTERIOR_SMALL
} = require('../config/constant');

module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    'Service',
    {
      serviceName: {
        type: DataTypes.ENUM(
            SERVICE_EXTERIOR_LARGE,
            SERVICE_EXTERIOR_MEDIUM,
            SERVICE_EXTERIOR_SMALL,
            SERVICE_INTERIOR_LARGE,
            SERVICE_INTERIOR_MEDIUM,
            SERVICE_INTERIOR_SMALL
        ),
        allowNull: false
      },
      houseType: {
        type:DataTypes.ENUM(TYPE_FC,TYPE_PRIVATE),
        allowNull: false
      },
      price: {
        type: DataTypes.ENUM(
            PRICE_EXTERIOR_LARGE,
            PRICE_EXTERIOR_MEDIUM,
            PRICE_EXTERIOR_SMALL,
            PRICE_INTERIOR_LARGE,
            PRICE_INTERIOR_MEDIUM,
            PRICE_INTERIOR_SMALL
        ),
        allowNull: false
      }
    },
    { underscored: true,
    timestamps: false }
  );

  Service.associate = db => {
    Service.hasMany(db.Order, {
        foreignKey: {
            name: 'serviceId',
            allowNull: false
        },
        onDelete : 'RESTRICT'
    });
  };

  return Service;
};
