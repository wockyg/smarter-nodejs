const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('v1500', {
    v1500Id: {
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
    hcfaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'd1500',
        key: 'hcfaId'
      }
    },
    claim_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    // v1500_filename: {
    //   type: DataTypes.STRING(255),
    //   allowNull: true
    // },
    // d1500_filename: {
    //   type: DataTypes.STRING(255),
    //   allowNull: true
    // },
    original_filename: {
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
    extractionId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    extractionStatus: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    page_count: {
      type: DataTypes.INTEGER,
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
    method: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    },
    d1500Approved: {
      type: DataTypes.DATE,
      allowNull: true
    },
    num_matches: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'v1500',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "v1500Id" },
        ]
      },
      {
        name: "v1500_FK",
        using: "BTREE",
        fields: [
          { name: "referralId" },
        ]
      },
      {
        name: "v1500_FK2",
        using: "BTREE",
        fields: [
          { name: "hcfaId" },
        ]
      },
    ]
  });
};
