module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        profileImage: DataTypes.STRING,
      },
      {
        underscored: true,
        timestamps: false
      }
    );
  
    User.associate = db => {
        User.hasMany(db.Order, {
          as: 'userId',
          allowNull: false,
          onDelete: 'RESTRICT'
        });
      };


    return User;
  };
  