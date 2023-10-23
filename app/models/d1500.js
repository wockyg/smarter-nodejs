const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d1500', {
    hcfaId: {
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
    sendFormat: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    physician_npi: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    physician_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    patient_account_no: {
      type: DataTypes.STRING(100),
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
     dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'd1500',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hcfaId" },
        ]
      },
      {
        name: "d1500_FK",
        using: "BTREE",
        fields: [
          { name: "referralId" },
        ]
      },
    ]
  });
};
