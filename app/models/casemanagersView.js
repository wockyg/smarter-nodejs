const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('casemanagersView', {
    casemanagerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastFirst: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    client: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    suite: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phoneExt: {
      type: DataTypes.STRING(100),
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
    fceRate: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    ppdRate: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    ppdDiscountRate: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ptInstructions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fceppdInstructions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    billingInstructions: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    doNotSync: true,
    tableName: 'casemanagersView',
    timestamps: false,
  });
};
