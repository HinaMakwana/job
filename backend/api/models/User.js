/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const role = sails.config.constant.role
const Validator = sails.config.custom.Validator
const validateRule = sails.config.constant.validationRule.User
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
    },
    forgetPassToken : {
      type : 'string',
      allowNull : true
    },
    forgetPassExpTime : {
      type : 'number',
      allowNull: true
    },
    //through association
    likePosts : {
      collection : 'job',
      via : 'clients',
      through : 'like'
    },
    //one-to-one relation
    moreData : {
      model: 'moreinfo'
    },
    //one-to-many association
    Education : {
      collection: 'education',
      via : 'userData'
    },
    //many-to-many relation
    savedPosts : {
      collection : 'job',
      via : 'users',
      through : 'savePost'
    }
  },

  ValidationBeforeCreate : (data) => {
    let requiredRules = Object.keys(validateRule).filter((key)=> {
      if(Object.keys(data).indexOf(key)>= 0) {
        return key
      }
    })
    let rules = {};
    requiredRules.forEach((val)=> {
      rules[val] = validateRule[val]
    })
    let validate = new Validator(data,rules)
    let result = {}
    if(validate.passes()){
      console.log('validate success');
      result['hasError'] = false
      return data
    }
    if(validate.fails()) {
      console.log(1);
      result['hasError'] = true
      result['error'] = validate.errors.all()
    }
    return result
  }
};
