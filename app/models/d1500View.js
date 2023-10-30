const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d1500View', {
    hcfaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    referralId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sendFormat: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dateApproved: {
      type: DataTypes.DATE,
      allowNull: true
    },
    method: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    claimant: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    claimNumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    service: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    adjuster: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    adjusterClient: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    original_dos: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
  }, {
    sequelize,
    doNotSync: true,
    tableName: 'd1500view',
    timestamps: false,
  });
};
