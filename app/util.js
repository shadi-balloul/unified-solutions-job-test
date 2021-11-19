var bcrypt = require('bcryptjs');

module.exports = {
    // We are using salted hashes with salt value 10 
    encrypt: function (plainText) {
        return bcrypt.hashSync(plainText, parseInt(process.env.HASH_SALT));
    },
	
	compareSync: function (plainText, password) {
        return bcrypt.compareSync(plainText, password);
    }
    
};