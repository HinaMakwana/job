module.exports = {


  friendlyName: 'Common fun',


  description: '',


  inputs: {
    id : {
      type : 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const findUser = await User.findOne({id: inputs.id,isDeleted: false})
    if(!findUser) {
        return res.status(Statuscode.NOT_FOUND).json({
            status: Statuscode.NOT_FOUND,
            message: 'User not found'
        })
    } else {
      return findUser
    }
  }


};
