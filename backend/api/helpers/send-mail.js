const nodemailer = sails.config.custom.nodemailer
module.exports = {


  friendlyName: 'Send mail',


  description: '',


  inputs: {
    email : {
      type : 'string'
    },
    firstName : {
      type : 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    console.log(1);
    const mail = inputs.email;
    let transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: { user: "f92a35a294cae1", pass: "11e4263e3c726e" }
    });
    let message  = {
      from : '"zignuts" <zignuts@gmail.com>',
      to : mail,
      subject : "testing",
      text : "Hello",
      html : "welcome to zignuts " + inputs.firstName + "<br><button>Verify account</button>"
  }
    transport.sendMail(message)
  }
}

