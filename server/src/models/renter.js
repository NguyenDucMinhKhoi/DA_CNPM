'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Renter extends Model {
    static associate(models) {
      // Mối quan hệ 1-1 với User
      Renter.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'user'
      });
      
      // Các mối quan hệ khác của Renter nếu cần
      Renter.hasMany(models.Post, { foreignKey: 'renter_id' });
    }
  }

  Renter.init({
    id_user: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      field: 'date_of_birth'
    },
    gender: {
      type: DataTypes.STRING(5),
      validate: {
        isIn: [['Nam', 'Nữ', 'Khác']]
      }
    },
    hometown: DataTypes.STRING(50),
    nationalId: {
      type: DataTypes.STRING(20),
      field: 'national_id',
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Renter',
    tableName: 'renters',
    timestamps: true,
    underscored: true
  });

  return Renter;
};