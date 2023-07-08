const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dptAuthorization', {
    authId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    referralId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'referralsNotification',
        key: 'referralId'
      }
    },
    approvedVisits: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    firstAuth: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dptAuthorization',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "authId" },
        ]
      },
      {
        name: "dptAuthorization_FK",
        using: "BTREE",
        fields: [
          { name: "referralId" },
        ]
      },
    ]
  });
};
