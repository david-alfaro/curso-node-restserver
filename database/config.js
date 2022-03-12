const mongoose = require('mongoose');

const dbConnection =async()=>{

    try {
        await mongoose.connect(process.env.MONGO_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            //useCreateIndex:true,
            //useFindeAndModify:false
        });
        console.log('Conectados a MongoDB');
    } catch (error) {
        console.log(error);
        throw new Error('Error al levantar la base de datos');
    }

}


module.exports = {
    dbConnection
}