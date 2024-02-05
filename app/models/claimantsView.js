const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('claimantsView', {
    claimantId: {
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
      type: DataTypes.STRING(255),
      allowNull: true
    },
    employerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    employer: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    birthDateFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.birthDate ? new Date(this.birthDate) : null;
        return this.birthDate ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    injuryDate1: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    injuryDate1Format: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.injuryDate1 ? new Date(this.injuryDate1) : null;
        return this.injuryDate1 ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
    },
    injuryDate2: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    injuryDate2Format: {
      type: DataTypes.VIRTUAL,
      get() {
        const d = this.injuryDate2 ? new Date(this.injuryDate2) : null;
        return this.injuryDate2 ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}` : null;
      }
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
    lat: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lon: {
      type: DataTypes.STRING(100),
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
    doNotSync: true,
    tableName: 'claimantsview',
    timestamps: false,
  });
};
