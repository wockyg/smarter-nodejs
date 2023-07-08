const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clients', {
    clientId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    client: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    billReview: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fax: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    billingProtocol: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mailingAddress: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'clients',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "clientId" },
        ]
      },
    ]
  });
};
