const mongoose = require('mongoose');
//Dado que tengo un mac tengo que cambiar el código para que conecte el localhost por IPv4.
const urlDb = 'mongodb://127.0.0.1:27017/proyecto-basico-express-movies'

const connect = async () => {
    try {
        await mongoose.connect(urlDb);
        console.log(`Conected with db succesfully`);
    }catch(error) {
        console.log('Error to connect with db', error.message)
    };
}

module.exports = {
    connect
};