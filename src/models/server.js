const dc = require('../config/datacenter');
module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define(
    'Server',
    {
      datacenterName: {
        type: DataTypes.ENUM(dc.DC_ELEMENTAL,dc.DC_GAIA,dc.DC_MANA,dc.DC_METEOR),
        allowNull: false
      },
      serverName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { 
      underscored: true,
      timestamps:false 
    }
  );

  Server.associate = db => {
    Server.hasMany(db.Order, {
        foreignKey: {
            name: 'serverId',
            allowNull: false
          },
      onDelete: 'CASCADE'
    });
  };

  return Server;
};
