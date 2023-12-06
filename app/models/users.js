const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    initials: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    schPermissions: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    billPermissions: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    d1500Permissions: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    rrPermissions: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ptoPermissions: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastLogout: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    },
    history1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    history2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    history3: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    history4: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    history5: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    covering: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    hireDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    maxDaysPTO: {
      type: DataTypes.VIRTUAL,
      get() {
        const today = new Date();
        const hired = new Date(this.hireDate);

        let months;
        months = (today.getFullYear() - hired.getFullYear()) * 12;
        months -= today.getMonth();
        months += hired.getMonth();

        let days = 0;

        if (months < 48) {
          days = 10;
        }
        else if (months < 60) {
          days = 15;
        }
        else {
          days = 20;
        }

        return days;
      }
    },
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "users_FK",
        using: "BTREE",
        fields: [
          { name: "history1" },
        ]
      },
      {
        name: "users_FK_1",
        using: "BTREE",
        fields: [
          { name: "history2" },
        ]
      },
      {
        name: "users_FK_2",
        using: "BTREE",
        fields: [
          { name: "history3" },
        ]
      },
      {
        name: "users_FK_3",
        using: "BTREE",
        fields: [
          { name: "history4" },
        ]
      },
      {
        name: "users_FK_4",
        using: "BTREE",
        fields: [
          { name: "history5" },
        ]
      },
    ]
  });
};
