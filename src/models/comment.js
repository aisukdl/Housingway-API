module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      comment: {
        type: DataTypes.STRING,
        unique: false}
    },
    { 
        underscored: true,
        timestamps: false 
    }
  );
  Comment.removeAttribute('id');

  Comment.associate = db => {
   Comment.belongsTo(db.Order, {
      foreignKey: {
        name: 'orderId',
        allowNull: false,
        primaryKey: true
      },
      onDelete: 'RESTRICT'
    });
  };

  return Comment;
};
