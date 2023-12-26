const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rrWeeklyLogs', {
    logId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    referralId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rrLastWorked: {
      type: DataTypes.DATE,
      allowNull: true
    },
    rrFaxReceived: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
    },
    numDays: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.rrLastWorked && this.rrFaxReceived) {
          const start = new Date(this.rrLastWorked);
          const end = new Date(this.rrFaxReceived);
          const Difference_In_Time = end.getTime() - start.getTime(); 
          const numDays = Difference_In_Time / (1000 * 3600 * 24); 
          return numDays;
        }
        else {
          return null;
        }
      }
    },
  }, {
    sequelize,
    tableName: 'rrWeeklyLogs',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "logId" },
        ]
      },
      {
        name: "rrWeeklyLogs_FK",
        using: "BTREE",
        fields: [
          { name: "referralId" },
        ]
      },
    ]
  });
};
