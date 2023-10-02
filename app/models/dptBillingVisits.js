const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dptBillingVisits', {
    billingId: {
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
    dos: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dosTime: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    attend: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    serviceType: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dosNotes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    notesReceived: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    needPN: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    v1500: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    v1500Status: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    requestV1500: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    v1500RequestGenerated: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    v1500LastRequested: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    d1500Generated: {
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
    hcfaId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hcfaGenerated: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    hcfaSendFormat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    adjusterRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    adjusterDatePaid: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    adjusterAmountPaid: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    paymentStatusDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    paymentStatus: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    paymentStatusIssue: {
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
    facilityRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    facilityDatePaid: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    facilityAmountPaid: {
      type: DataTypes.DECIMAL(10,2),
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
    tableName: 'dptBillingVisits',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "billingId" },
        ]
      },
      {
        name: "dptBillingVisits_FK_1",
        using: "BTREE",
        fields: [
          { name: "referralId" },
        ]
      },
    ]
  });
};
