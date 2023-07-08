const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fceppdBilling', {
    fceId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    referralId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'referralsNotification',
        key: 'referralId'
      }
    },
    v1500: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    d1500Sent: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    d1500SendFormat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    adjusterRate: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    adjusterRateAdjustment: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    paymentStatusDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    paymentStatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rebillNeeded: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dateRebilled: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    rebillFormat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    adjusterDatePaid: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    adjusterAmountPaid: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    facilityRate: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    facilityDatePaid: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    facilityAmountPaid: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    checkNumber: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    writeOff: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'fceppdBilling',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "fceId" },
        ]
      },
      {
        name: "fceppdBilling_FK",
        using: "BTREE",
        fields: [
          { name: "referralId" },
        ]
      },
    ]
  });
};
