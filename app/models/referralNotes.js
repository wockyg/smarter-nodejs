const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('referralNotes', {
    noteId: {
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
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    timestampFormat: {
      type: DataTypes.VIRTUAL,
      get() {

        let dstShift;

        Date.prototype.stdTimezoneOffset = function () {
          var jan = new Date(this.getFullYear(), 0, 1);
          var jul = new Date(this.getFullYear(), 6, 1);
          return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
        }

        Date.prototype.isDstObserved = function () {
          return this.getTimezoneOffset() < this.stdTimezoneOffset();
        }

        var testDate = new Date(this.timestamp);
        if (testDate.isDstObserved()) { 
          dstShift = 4;
        }
        else {
          dstShift = 5;
        }
        const d = new Date(this.timestamp);
        // console.log(d);
        // console.log(d.getHours());
        // console.log(d.getUTCHours() - dstShift);
        const hoursShifted = d.getUTCHours() - dstShift
        const hours = hoursShifted > 12 ? hoursShifted % 12 : hoursShifted;
        const ampm = hoursShifted > 12 ? 'PM' : 'AM';
        const minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
        return this.timestamp ? `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()} ${hours}:${minutes} ${ampm}` : null;
      }
    },
    initials: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    flag: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'referralNotes',
    timestamps: true,
    updatedAt: false,
    createdAt: 'timestamp',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "noteId" },
        ]
      },
      {
        name: "referralNotes_FK",
        using: "BTREE",
        fields: [
          { name: "referralId" },
        ]
      },
    ]
  });
};
