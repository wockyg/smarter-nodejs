const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('therapists', {
    therapistId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    suite: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    bldg: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    unit: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    floor: {
      type: DataTypes.STRING(50),
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
    bulkBillingId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bulkBilling',
        key: 'bulkBillingId'
      }
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phoneExt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fax: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    display: {
      type: DataTypes.VIRTUAL,
      get() {

        return `${this.name} :: ${this.address}, ${this.city}, ${this.state} ${this.zip} :: P ${this.phone} :: F ${this.fax}`;
      }
    },
    contact: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    contact2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rrEmailPreference: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rrEmail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rrFaxPreference: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rrFax: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rrPhonePreference: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rrPhone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    spanish: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fceTier: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fceAgreement: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fceAgreementStatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fceAgreementTimestamp: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fce: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fceRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ppd: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ppdRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    dptAgreement: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dptAgreementStatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dptAgreementTimestamp: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dpt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dailyRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    evalRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    combinedRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    wcwhFirst2Hrs: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    wcwhAdditionalHour: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    wcwhAgreement: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    wcwhAgreementStatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    wcwhAgreementTimestamp: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    renegotiatedPTRates: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    renegotiatedFCERates: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    renegotiatedWCRates: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    oldDailyRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    oldEvalRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    oldCombinedRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    oldFceRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    oldPpdRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    oldWcwhFirst2Hrs: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    oldWcwhAdditionalHr: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    billingContact: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    billingPhone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    billingPhoneExt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    billingFax: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    billingEmail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    billingContact2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    billingPhone2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    billingPhone2Ext: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    billingFax2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    billingEmail2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    billsMonthly: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    referToProfile: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    billingProfile: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DPT_AN: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PPD_GL: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DPT_AQ: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DPT_MT: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DPT_OT: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DPT_WH: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DPT_WC: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DPT_TH: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    doNotUse: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    doNotUseReason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ptProfile: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lat: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'therapists',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "therapistId" },
        ]
      },
      {
        name: "therapists_FK",
        using: "BTREE",
        fields: [
          { name: "bulkBillingId" },
        ]
      },
    ]
  });
};
