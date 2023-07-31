const nodemailer = sails.config.custom.nodemailer
module.exports = {


  friendlyName: 'Send mail',


  description: '',


  inputs: {
    managerEmail : {
      type : 'string'
    },
    email : {
      type : 'string'
    },
    firstName : {
      type : 'string'
    },
    title : {
      type : 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    console.log(inputs);
    const mail = inputs.email;
    let result = {};
    console.log(process.env.USER1,process.env.PASSWORD);
    let transport = await nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: { user: process.env.USER1, pass: process.env.PASSWORD }
    });
    // let transport = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user:process.env.USER1,
    //     pass:process.env.PASSWORD
    //   }
    // })
    let message  = {
      from : mail,
      to : `${inputs.managerEmail}`,
      subject : "application for job",
      // text : "Hello",
      html : `${inputs.firstName} candidate is apply for ${inputs.title}`
    }
    transport.sendMail(message, (err,data)=>{
      if(err) {
        console.log(err);
      }
      if(data) {
        console.log(data);
      }
    })
    return result
  }
}
