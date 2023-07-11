const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fceppdBillingView', {
    fceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    referralId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    assign: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
     service: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    claimNumber: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    bodyPart: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    claimant: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    claimantBirthDate: {
      type: DataTypes.DATEONLY,
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
    casemanager: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    casemanagerClient: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    therapist: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    therapistAddress: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    therapistCity: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    therapistState: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    therapistZip: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    therapistPhone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    therapistPhoneExt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    therapistFax: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dos: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    reportReceivedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
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
    doNotSync: true,
    tableName: 'fceppdBillingview',
    timestamps: false,
  });
};
