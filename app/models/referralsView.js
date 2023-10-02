const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('referralsView', {
    referralId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rrLastLastWorked: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    rrLastWorked: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ccWorked: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    rrFaxReceived: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fceId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ptAuthId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ptMaxAuthId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    odgAttendance: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TotalAuthVisits: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    referralStatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ptStatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fuHoldNotes: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    billingStatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    assign: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    assignFirst: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    assignLast: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    assignEmail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    assignPhone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    referralDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    referralDateFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = new Date(this.referralDate);
        return `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}`;
      }
    },
    scheduleDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    scheduleDateFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.scheduleDate ? new Date(this.scheduleDate) : null;
        return this.scheduleDate ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    spanishSpeaking: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    translationNeeded: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    transportNeeded: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    postOp: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    service: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    serviceGeneral: {
      type: DataTypes.VIRTUAL,
      get() {
        const s = this.service ? this.service : null;
        const sg = s && (s.includes("DPT") ? "DPT" : (s.includes("FCE") ? "FCE" : (s.includes("PPD") ? "FCE" : null)));
        return (sg);
      }
    },
    jurisdiction: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    bodyPart: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icd10: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    approvedVisits: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    odg: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    odgLimitEmailSent: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    evalAndTreat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    apptDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    apptDateFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.apptDate ? new Date(this.apptDate) : null;
        return this.apptDate ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    apptTime: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    originalApptDates: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    claimNumber: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    claimantId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'claimants',
        key: 'claimantId'
      }
    },
    claimantFirst: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    claimantLast: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    claimant: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    claimantGender: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    claimantBirthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    claimantBirthDateFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.claimantBirthDate ? new Date(this.claimantBirthDate) : null;
        return this.claimantBirthDate ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    claimantInjuryDate1: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    claimantInjuryDate1Format: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.claimantInjuryDate1 ? new Date(this.claimantInjuryDate1) : null;
        return this.claimantInjuryDate1 ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    claimantAddress: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    claimantCity: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    claimantState: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    claimantZip: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    claimantPhone: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    claimantEmployerId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    employer: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    employerAddress: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    employerCity: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    employerState: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    employerZip: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    therapistId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'therapists',
        key: 'therapistId'
      }
    },
    therapist: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    therapistAddress: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    therapistSuite: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    therapistCity: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    therapistState: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    therapistZip: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    therapistPhone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    therapistPhoneExt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    therapistFax: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    therapistBeaver: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    therapistDisplay: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.therapistId ? `${this.therapist} :: ${this.therapistAddress}${this.therapistSuite ? `, Ste ${this.therapistSuite}` : ''}, ${this.therapistCity}, ${this.therapistState} ${this.therapistZip} :: P ${this.therapistPhone}${this.therapistPhoneExt ? ` x${this.therapistPhoneExt}` : ''} :: F ${this.therapistFax}` : null;
      }
    },
    therapistDisplay2: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.therapistId ? `${this.therapist} (${this.therapistCity}, ${this.therapistState}) P: ${this.therapistPhone}` : null;
      }
    },
    adjusterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'adjusters',
        key: 'adjusterId'
      }
    },
    adjuster: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    adjusterClientId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    adjusterClient: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    adjusterClientMailingAddress: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    adjusterDisplay: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.adjusterId ? `${this.adjuster} | ${this.adjusterClient}` : null;
      }
    },
    casemanagerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'casemanagers',
        key: 'casemanagerId'
      }
    },
    casemanager: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    casemanagerClient: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    casemanager2Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'casemanagers',
        key: 'casemanagerId'
      }
    },
    casemanager2: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    casemanager2Client: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    physicianId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'physicians',
        key: 'physicianId'
      }
    },
    physicianFirst: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    physicianLast: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    physicianNPI: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    physicianFacility: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    physicianDisplay: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.physicianId ? `${this.physicianLast}, ${this.physicianFirst} | ${this.physicianFacility}` : null;
      }
    },
    plaintiffAttorneyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'attorneys',
        key: 'attorneyId'
      }
    },
    plaintiffAttorney: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    plaintiffAttorneyFirm: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    defenseAttorneyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'attorneys',
        key: 'attorneyId'
      }
    },
    defenseAttorney: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    defenseAttorneyFirm: {
      type: DataTypes.STRING(202),
      allowNull: true
    },
    fuDrDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fuDrDateFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.fuDrDate ? new Date(this.fuDrDate) : null;
        return this.fuDrDate ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    billingNotes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reminderDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    reminderNote: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reminderSent: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    lastDOS: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fuHoldTimestamp: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fuHoldTimestampFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.fuHoldTimestamp ? new Date(this.fuHoldTimestamp) : null;
        return this.fuHoldTimestamp ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    lastAdjUpdateSent: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    rrIADailyWorked: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    reportStatus: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rescheduled: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    rescheduleFlag: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rescheduleDOS: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    rescheduleTime: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    claimantInfoFromAdjuster: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rxFromAdjuster: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    demosFromAdjuster: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ovnFromAdjuster: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ptNotesFromAdjuster: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    jdFromAdjuster: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mriFromAdjuster: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    postOpFromAdjuster: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    claimantVerbalConfirm: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    confirmLetterToClaimant: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    confirmLetterToClaimantDateFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.confirmLetterToClaimant ? new Date(this.confirmLetterToClaimant) : null;
        return this.confirmLetterToClaimant ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    confirmLetterToClaimantFormat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    confirmLetterToAdjuster: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    confirmLetterToAdjusterDateFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.confirmLetterToAdjuster ? new Date(this.confirmLetterToAdjuster) : null;
        return this.confirmLetterToAdjuster ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    confirmLetterToAdjusterFormat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    confirmLetterToAttorney: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    confirmLetterToAttorneyDateFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.confirmLetterToAttorney ? new Date(this.confirmLetterToAttorney) : null;
        return this.confirmLetterToAttorney ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    confirmLetterToAttorneyFormat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    medNotesToPT: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    medNotesToPTDateFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.medNotesToPT ? new Date(this.medNotesToPT) : null;
        return this.medNotesToPT ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    medNotesToPTFormat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    claimantConfirmDayBefore: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ptConfirmDayBefore: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    confirmAttend: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    reportReceivedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fceApproved: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fceApprovedFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.fceApproved ? new Date(this.fceApproved) : null;
        return this.fceApproved ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    invoiceRequested: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    reportToAdjuster: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    reportToAdjusterFormat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    reportToPhysician: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    reportToPhysicianFormat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    reportToAttorney: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    reportToAttorneyFormat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    requestRecords: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    doNotSync: true,
    tableName: 'referralsview',
    timestamps: false,
  });
};
