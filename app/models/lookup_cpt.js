const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lookup_cpt', {
    Code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MaxUnit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    GA: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    AL: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    SC: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    NC: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TN: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    AK: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    AR: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    AZ: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    CA: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    CO: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },

    CT: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    DE: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    FL: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    HI: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    IA: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ID: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    IL: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    IN: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    KS: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    KY: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },

    LA: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    MA: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    MD: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ME: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    MI: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    MN: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    MO: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    MS: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    MT: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ND: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },

    NE: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    NH: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    NJ: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    NM: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    NV: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    NY: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    OH: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    OK: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    OR: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    PA: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },

    RI: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    SD: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TX: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    UT: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    VA: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    VT: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    WA: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    WI: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    WV: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    WY: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'lookup_cpt',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      }
    ]
  });
};
