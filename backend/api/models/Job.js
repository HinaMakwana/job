/**
 * Job.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
let workType = sails.config.constant.WorkType
let jobType = sails.config.constant.jobType
let validateRule = sails.config.constant.validationRule.Job
let Validator = sails.config.custom.Validator
module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true,
    },
    company: {
      type: 'string',
      required: true
    },
    workplaceType: {
      type: 'string',
      isIn: [workType.home,workType.office]
    },
    jobLocation: {
      type: 'string',
      required: true
    },
    jobType: {
      type: 'string',
      required: true,
      isIn : [jobType.ft,jobType.pt,jobType.contract]
    },
    postedBy: {
      model: 'user'
    },
    description: {
      type: 'string',
      required: true
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    }

  },
  validateBeforeCreateOrUpdate : (data) => {
    let requiredRules = Object.keys(validateRule).filter((key)=> {
      if(Object.keys(data).indexOf(key) >= 0) {
        return key
      }
    })
    let rule = {};
    requiredRules.forEach((val)=>{
      rule[val] = validateRule[val]
    })
    let validation = new Validator(data,rule)
    let result = {}
    if(validation.passes()) {
      result['hasError'] = false
    }
    if(validation.fails()) {
      result['hasError'] = true
      result['error'] = validation.errors.all()
    }
    return result
  }
};
