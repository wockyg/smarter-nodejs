const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bulkBilling', {
    bulkBillingId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
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
      type: DataTypes.STRING(100),
      allowNull: true
    },
    bulkBillingDisplay: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} :: ${this.billingContact ? this.billingContact : ''} :: ${this.billingEmail ? `${this.billingEmail}` : 'NEED EMAIL'}`;
      }
    },
    billsMonthly: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    billingNotes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bulkBilling',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bulkBillingId" },
        ]
      },
    ]
  });
};
