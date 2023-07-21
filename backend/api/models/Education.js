/**
 * Education.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const eduType = sails.config.constant.eduType
const Validator = sails.config.custom.Validator
const validateRule = sails.config.constant.validationRule.Education
module.exports = {

  attributes: {

    educationType : {
      type: 'string',
      isIn : [eduType.ssc,eduType.hsc,eduType.degree],
      required : false
    },
    degreeName : {
      type : 'string',
      allowNull : true
    },
    instituteName : {
      type : 'string'
    },
    year : {
      type : 'string'
    },
    grade : {
      type : 'string'
    },
    //one-to-many association
    userData : {
      model : 'user'
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
