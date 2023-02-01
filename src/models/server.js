const dc = require('../config/datacenter');
const ele = require('../config/elemental');
const gaia = require('../config/gaia');
const meteor = require('../config/meteor');
module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define(
    'Server',
    {
      datacenterName: {
        type: DataTypes.ENUM(dc.DC_ELEMENTAL,dc.DC_GAIA,dc.DC_MANA,dc.DC_METEOR),
        allowNull: false
      },
      serverName: {
        type: DataTypes.ENUM(
          ele.ELE_AEGIS,
          ele.ELE_ATOMOS,
          ele.ELE_CARBUNCLE,
          ele.ELE_GARUDA,
          ele.ELE_GUNGNIR,
          ele.ELE_KUJATA,
          ele.ELE_TONBERRY,
          ele.ELE_TYPHON,
          gaia.GAIA_ALEXANDER,
          gaia.GAIA_BAHAMUT,
          gaia.GAIA_DURANDAL,
          gaia.GAIA_FENRIR,
          gaia.GAIA_IFRIT,
          gaia.GAIA_RIDILL,
          gaia.GAIA_TIAMAT,
          gaia.GAIA_ULTIMA,
          meteor.METEOR_BELIAS,
          meteor.METEOR_MANDRAGORA,
          meteor.METEOR_RAMUH,
          meteor.METEOR_SHINRYU,
          meteor.METEOR_UNICORN,
          meteor.METEOR_VALEFOR,
          meteor.METEOR_YOJIMBO,
          meteor.METEOR_ZEROMUS),
        allowNull: false
      }
    },
    { 
      underscored: true,
      timstamps:false 
    }
  );

  Server.associate = db => {
    Server.hasMany(db.Order, {
        foreignKey: {
            name: 'serverId',
            allowNull: false
          },
      onDelete: 'RESTRICT'
    });
  };

  return Server;
};
