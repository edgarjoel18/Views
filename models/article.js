'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    pictureUrl: DataTypes.STRING,
    publishedAt: DataTypes.DATE,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    sourceUrl: DataTypes.STRING
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};