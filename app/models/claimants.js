const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('claimants', {
    claimantId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lastFirst: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.lastName}, ${this.firstName}`;
      }
    },
    employerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employers',
        key: 'employerId'
      }
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    injuryDate1: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    injuryDate2: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(100),
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
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    alternatePhone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'claimants',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "claimantId" },
        ]
      },
      {
        name: "claimants_FK",
        using: "BTREE",
        fields: [
          { name: "employerId" },
        ]
      },
    ]
  });
};
