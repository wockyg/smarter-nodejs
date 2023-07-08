const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    initials: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "initials" },
        ]
      },
    ]
  });
};
