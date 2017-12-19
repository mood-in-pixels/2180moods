// FOR DISPLAYING OVERALL MOODS; (I.E., A YEAR IN REVIEW FROM MOODS-BY-DAY)
// ------------------------------------------------------------------------

module.exports = function(sequelize, DataTypes) {
  var Dim_moods = sequelize.define("Dim_moods", {
    mood_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color_one: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [7]
    },
    color_two: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [7]
    },
    active: {
      type: DataTypes.BOOLEAN,
      default: 1
    },
    date: {
      type: DataTypes.DATE
    }
  });


  Dim_moods.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Dim_moods.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Dim_moods.hasMany(models.Mood, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Dim_moods;
};
