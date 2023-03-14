const { 
    SERVICE_EXTERIOR_LARGE,
    SERVICE_EXTERIOR_MEDIUM,
    SERVICE_EXTERIOR_SMALL,
    SERVICE_INTERIOR_LARGE,
    SERVICE_INTERIOR_MEDIUM,
    SERVICE_INTERIOR_SMALL
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
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
        onDelete : 'CASCADE'
    });
  };

  return Service;
};
