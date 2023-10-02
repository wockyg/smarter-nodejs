const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('referral_icd10', {
    referralId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    icd10: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    rank: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    letter: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'referral_icd10',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "referralId" },
          { name: "icd10" },
        ]
      },
    ]
  });
};
