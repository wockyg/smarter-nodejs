const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('v1500View', {
    v1500Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    referralId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hcfaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    },
    d1500Approved: {
      type: DataTypes.DATE,
      allowNull: true
    },
    jurisdiction: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    bodyPart: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    method: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    v1500_filename: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    d1500_filename: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    original_dos: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    claimant: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    claimNumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    service: {
      type: DataTypes.STRING(100),
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
    clientDiscount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    original_dos: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    physician_npi: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    physician_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    patient_account_no: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    original_dos: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    diagnosis_a: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    diagnosis_b: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    diagnosis_c: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    diagnosis_d: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    diagnosis_e: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    diagnosis_f: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    diagnosis_g: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    diagnosis_h: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    diagnosis_i: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    diagnosis_j: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    diagnosis_k: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    diagnosis_l: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
  }, {
    sequelize,
    doNotSync: true,
    tableName: 'v1500view',
    timestamps: false,
  });
};
