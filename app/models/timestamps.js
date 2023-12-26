const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('timestamps', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rrLastWorked: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ascending: {
      type: DataTypes.VIRTUAL,
      get() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const startDate = new Date(year, 0, 1);
        const days = Math.floor(((currentDate - startDate) / (24 * 60 * 60 * 1000)) + 1);
        const currentWeekNumber = Math.ceil(days / 7);

        return ((currentWeekNumber % 2) === 0);
      }
    },
  }, {
    sequelize,
    tableName: 'timestamps',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
