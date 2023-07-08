const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('physicians', {
    physicianId: {
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
    titles: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    facility: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    suite: {
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
    phoneExt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fax: {
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
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    npi: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'physicians',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "physicianId" },
        ]
      },
    ]
  });
};
