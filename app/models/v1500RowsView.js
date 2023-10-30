const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('v1500RowsView', {
    rowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    v1500Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    referralId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hcfaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dos: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pos: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cpt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mod1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mod2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mod3: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    diag: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mod4: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    charges: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    units: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    provider_npi: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    },
    d1500Approved: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    doNotSync: true,
    tableName: 'v1500rowsview',
    timestamps: false,
  });
};
