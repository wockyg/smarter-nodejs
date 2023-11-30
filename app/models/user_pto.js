const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_pto', {
    ptoId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    start: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    end: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dateRequested: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dateApproved: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dateDenied: {
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

        if (!this.end) {
          return 1;
        }

        const start = new Date(this.start);
        const end = new Date(this.end);

        const Difference_In_Time = end.getTime() - start.getTime(); 
      
        const numDays = Difference_In_Time / (1000 * 3600 * 24); 

        return numDays;
      }
    },
    status: {
      type: DataTypes.VIRTUAL,
      get() {

        if (!this.dateApproved && !this.dateDenied) {
          return 'pending';
        }
        else if (this.dateDenied) {
          return 'denied';
        }
        else if (this.dateApproved) {
          return 'approved';
        }
      }
    },
    color: {
      type: DataTypes.VIRTUAL,
      get() {

        if (!this.dateApproved && !this.dateDenied) {
          return '#F95E00';
        }
        else if (this.dateDenied) {
          return '#F90000';
        }
        else if (this.dateApproved) {
          return '#02B12C';
        }
      }
    }
  }, {
    sequelize,
    tableName: 'user_pto',
    timestamps: true,
    updatedAt: false,
    createdAt: 'dateAdded',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ptoId" },
        ]
      },
      {
        name: "user_pto_FK",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
};
