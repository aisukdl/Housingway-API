module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
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
        role: {
          type: DataTypes.STRING,
          defaultValue: 'CUSTOMER'
        }
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
          onDelete: 'CASCADE'
        });
      };


    return User;
  };
  