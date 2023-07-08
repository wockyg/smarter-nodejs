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
        const d = new Date(this.timestamp);
        const hours = d.getHours() > 12 ? d.getHours() % 12 : d.getHours();
        const ampm = d.getHours() > 12 ? 'PM' : 'AM';
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
