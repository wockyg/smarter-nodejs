const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('featureRequests', {
    featureId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    submittedBy: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dateAdded: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dateFixed: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    screenshot: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'featureRequests',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "featureId" },
        ]
      },
    ]
  });
};
