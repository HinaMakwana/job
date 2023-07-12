/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const role = sails.config.constant.role
module.exports = {

  attributes: {
  
    firstName : {
      type : 'string',
      required : true
    },
    lastName : {
      type : 'string',
      required : true
    },
    email : {
      type : 'string',
      required : true,
      isEmail : true
    },
    password : {
      type : 'string',
      required : true
    },
    token : {
      type : 'string',
      allowNull : true
    },
    isDeleted : {
      type : 'boolean',
      defaultsTo : false
    },
    imageUrl : {
      type : 'string',
      allowNull : true
    },
    role : {
      type : 'string',
      required: true,
      isIn : [role.manager,role.client]
    }
  },
};
