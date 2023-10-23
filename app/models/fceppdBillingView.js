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
    therapistSuite: {
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
    therapistDisplay: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.therapist ? `${this.therapist} :: ${this.therapistAddress}${this.therapistSuite ? `, Ste ${this.therapistSuite}` : ''}, ${this.therapistCity}, ${this.therapistState} ${this.therapistZip} :: P ${this.therapistPhone}${this.therapistPhoneExt ? ` x${this.therapistPhoneExt}` : ''} :: F ${this.therapistFax}` : null;
      }
    },
    therapistDisplayShort: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.therapist ? `${this.therapist} :: ${this.therapistAddress}${this.therapistSuite ? `, Ste ${this.therapistSuite}` : ''}, ${this.therapistCity}, ${this.therapistState} ${this.therapistZip}` : null;
      }
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
    adjusterRateAdjusted: {
      type: DataTypes.VIRTUAL,
      get() {
        const r = +this.adjusterRate + +this.adjusterRateAdjustment
        return this.adjusterRateAdjustment ? r.toFixed(2) : this.adjusterRate;
      }
    },
    adjusterDateDueFormula: {
      type: DataTypes.VIRTUAL,
      get() {

        function padTo2Digits(num) {
          return num.toString().padStart(2, '0');
        }
        const d = this.dateRebilled ? new Date(this.dateRebilled) : new Date(this.d1500Sent);
        d.setDate(d.getDate() + 45);
        return this.d1500Sent 
        ? 
        [
          d.getFullYear(),
          padTo2Digits(d.getMonth() + 1),
          padTo2Digits(d.getDate()),
        ].join('-') 
        : 
        null;
            }
    },
    adjusterDateDueFormulaFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.adjusterDateDueFormula ? new Date(this.adjusterDateDueFormula) : null;
        return d ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    adjusterPastDueFormula: {
      type: DataTypes.VIRTUAL,
      get() {
        const late = (!this.adjusterDatePaid && this.adjusterDateDueFormula && this.adjusterDateDueFormula < Date.now()) ? "Yes" : null;
        return late;
      }
    },
    paymentStatusDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    paymentStatusDateFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = new Date(this.paymentStatusDate);
        return this.paymentStatusDate ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
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
    dateRebilledFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = new Date(this.dateRebilled);
        return this.dateRebilled ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    rebillFormat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    adjusterDatePaid: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    adjusterDatePaidFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = new Date(this.adjusterDatePaid);
        return this.adjusterDatePaid ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    adjusterAmountPaid: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    facilityRate: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    facilityDateDueFormula: {
      type: DataTypes.VIRTUAL,
      get() {
        function padTo2Digits(num) {
          return num.toString().padStart(2, '0');
        }
        const d = this.dos ? new Date(this.dos) : null;
        d && d.setDate(d.getDate() + 45);
        return this.dos
        ? 
        [
          d.getFullYear(),
          padTo2Digits(d.getMonth() + 1),
          padTo2Digits(d.getDate()),
        ].join('-') 
        : 
        null;
      }
    },
    facilityDateDueFormulaFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.facilityDateDueFormula ? new Date(this.facilityDateDueFormula) : null;
        return d ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    facilityPastDueFormula: {
      type: DataTypes.VIRTUAL,
      get() {
        const today = new Date();
        const late = (!this.facilityDatePaid && this.facilityDateDueFormula && this.facilityDateDueFormula < today) ? "Yes" : null;
        return late;
      }
    },
    facilityDatePaid: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    facilityDatePaidFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = new Date(this.facilityDatePaid);
        return this.facilityDatePaid ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    facilityAmountPaid: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    checkNumber: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    expectedRevenue: {
      type: DataTypes.VIRTUAL,
      get() {
        const r = this.adjusterRate - this.facilityRate;
        return (this.adjusterRate && this.facilityRate) ? r.toFixed(2) : null;
      }
    },
    revenue: {
      type: DataTypes.VIRTUAL,
      get() {
        const r = this.adjusterAmountPaid - this.facilityAmountPaid;
        return (this.adjusterAmountPaid && this.facilityAmountPaid) ? r.toFixed(2) : null;
      }
    },
    discrepancy: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.expectedRevenue - this.revenue;
        return (this.expectedRevenue && this.revenue) ? d.toFixed(2) : null;
      }
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
