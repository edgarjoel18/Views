'use strict';
module.exports = (sequelize, DataTypes) => {
  const Audio = sequelize.define('Audio', {
    title: DataTypes.STRING,
    audioUrl: DataTypes.STRING,
    body: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {});
  Audio.associate = function(models) {
    // associations can be defined here
  };
  return Audio;
};