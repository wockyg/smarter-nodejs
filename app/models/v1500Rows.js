const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('v1500Rows', {
    rowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    v1500Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'v1500',
        key: 'v1500Id'
      }
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
    mod4: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    diag: {
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
    }
  }, {
    sequelize,
    tableName: 'v1500Rows',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rowId" },
        ]
      },
      {
        name: "v1500Rows_FK",
        using: "BTREE",
        fields: [
          { name: "v1500Id" },
        ]
      },
    ]
  });
};
