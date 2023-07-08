const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('referralsNotification', {
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
    DB_ODGAttendance: {
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
    ptStatusPrev: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fuHoldNotes: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fuHoldNotesPrev: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    billingStatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    assign: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'users',
        key: 'initials'
      }
    },
    referralDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    referralDateFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${new Date(this.referralDate).getMonth()}`;
      }
    },
    scheduleDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
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
    therapistId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'therapists',
        key: 'therapistId'
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
    casemanagerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'casemanagers',
        key: 'casemanagerId'
      }
    },
    casemanager2Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'casemanagers',
        key: 'casemanagerId'
      }
    },
    physicianId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'physicians',
        key: 'physicianId'
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
    defenseAttorneyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'attorneys',
        key: 'attorneyId'
      }
    },
    fuDrDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
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
    rescheduleDOSPrev: {
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
    confirmLetterToClaimantFormat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    confirmLetterToAdjuster: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    confirmLetterToAdjusterFormat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    confirmLetterToAttorney: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    confirmLetterToAttorneyFormat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    medNotesToPT: {
      type: DataTypes.DATEONLY,
      allowNull: true
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
    confirmAttendPrev: {
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
    tableName: 'referralsNotification',
    timestamps: true,
    updatedAt: false,
    createdAt: 'referralDate',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "referralId" },
        ]
      },
      {
        name: "referralsNotification_FK",
        using: "BTREE",
        fields: [
          { name: "adjusterId" },
        ]
      },
      {
        name: "referralsNotification_FK_1",
        using: "BTREE",
        fields: [
          { name: "plaintiffAttorneyId" },
        ]
      },
      {
        name: "referralsNotification_FK_2",
        using: "BTREE",
        fields: [
          { name: "defenseAttorneyId" },
        ]
      },
      {
        name: "referralsNotification_FK_3",
        using: "BTREE",
        fields: [
          { name: "casemanagerId" },
        ]
      },
      {
        name: "referralsNotification_FK_4",
        using: "BTREE",
        fields: [
          { name: "casemanager2Id" },
        ]
      },
      {
        name: "referralsNotification_FK_5",
        using: "BTREE",
        fields: [
          { name: "claimantId" },
        ]
      },
      {
        name: "referralsNotification_FK_6",
        using: "BTREE",
        fields: [
          { name: "physicianId" },
        ]
      },
      {
        name: "referralsNotification_FK_7",
        using: "BTREE",
        fields: [
          { name: "therapistId" },
        ]
      },
      {
        name: "referralsNotification_FK_8",
        using: "BTREE",
        fields: [
          { name: "assign" },
        ]
      },
    ]
  });
};
