const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rrWeeklyLogs', {
    logId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    numSentMonday: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numSentTuesday: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numSentWednesday: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numSentThursday: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numSentFriday: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numSentTotal: {
      type: DataTypes.VIRTUAL,
      get() {
        const total = this.numSentMonday + this.numSentTuesday + this.numSentWednesday + this.numSentThursday + this.numSentFriday;
        return total;
      }
    },
    numReceivedMonday: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numReceivedTuesday: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numReceivedWednesday: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numReceivedThursday: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numReceivedFriday: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numReceivedTotal: {
      type: DataTypes.VIRTUAL,
      get() {
        const total = this.numReceivedMonday + this.numReceivedTuesday + this.numReceivedWednesday + this.numReceivedThursday + this.numReceivedFriday;
        return total;
      }
    },
     numPending: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numNotWorked: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numCaughtUp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numFUH: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weekNum: {
      type: DataTypes.VIRTUAL,
      get() {
        // Returns the ISO week of the date.
        Date.prototype.getWeek = function() {
          var date = new Date(this.getTime());
          date.setHours(0, 0, 0, 0);
          // Thursday in current week decides the year.
          date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
          // January 4 is always in week 1.
          var week1 = new Date(date.getFullYear(), 0, 4);
          // Adjust to Thursday in week 1 and count number of weeks from date to week1.
          return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                                - 3 + (week1.getDay() + 6) % 7) / 7);
        }
        const weekNum = new Date(this.dateAdded).getWeek()
        return weekNum;
      }
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: true
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
    ]
  });
};
