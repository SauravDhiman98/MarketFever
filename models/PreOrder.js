const mongoose = require('mongoose');



const AddressSchema = mongoose.Schema({
                              Institute:{type: String},
                              town: {type:String},
                              city:{type:String, },
                              state:{type:String, }
                                      });

module.exports =  mongoose.model("AddressOfCustomer", AddressSchema);                                    