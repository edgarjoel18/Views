'use strict';
module.exports = (sequelize, DataTypes) => {
  const Audio = sequelize.define('Audio', {
    title: DataTypes.STRING,
    audioUrl: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {});
  Audio.associate = function(models) {
    // associations can be defined here
    models.Audio.belongsTo(models.User, {as: 'user'});
  };
  return Audio;
};
