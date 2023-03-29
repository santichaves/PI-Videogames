const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize)=>{
    sequelize.define('genre', {
        id:{
          type: DataTypes.INTEGER,
          primaryKey:true,
          autoIncrement: true,
          allowNull:false
          
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      created:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
      }
      
    },{timestamps:false});
    };
    