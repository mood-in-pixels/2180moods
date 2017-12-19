// FOR DAILY MOODS / LOGGING MOODS-BY-DAY
// ------------------------------------------------------------------------
module.exports = function(sequelize, DataTypes) {
  var Mood = sequelize.define("Mood", {
    mood_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mood_date: {
      type: DataTypes.DATE
    }
  });


 Mood.associate = function(models) {
   // We're saying that a Post should belong to an Author
   // A Post can't be created without an Author due to the foreign key constraint
   Mood.belongsTo(models.User, {
     foreignKey: {
       allowNull: false
     }
   }),
   Mood.belongsTo(models.Dim_moods, {
     foreignKey: {
       allowNull: false
     }
   })
 };

  return Mood;
};
