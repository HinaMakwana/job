const cloudinary = sails.config.constant.cloudinary;

module.exports = {


  friendlyName: 'Upload image',


  description: '',


  inputs: {
    url : {
      type: 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    err: {
      description: 'Not uploaded'
    }

  },


  // fn: async function (inputs) {
  //   let url
  //   console.log(inputs.fileName);
  //   let data = new Promise(async (Resolve, Reject)=> {
  //     await inputs.req.file(inputs.fileName).upload({
  //      saveAs: function(file, cb) {
  //       console.log(file);
  //        cb(null, file.filename);
  //      },
  //      dirname: require('path').resolve(sails.config.appPath, 'assets/images')
  //     //  dirname : `${inputs.dir}`
  //      },async (err, uploadedFiles) => {
  //          if(uploadedFiles.length === 0) {
  //            url = ' '
  //              return Resolve(url)
  //          }
  //          if(err){
  //              return Reject(err)
  //          } else {
  //           url = uploadedFiles[0]
  //           return Resolve(url)
  //          }
  //      })
  //   })
  //   return data
  // }
  fn: async function (inputs) {
    let url = {};

    cloudinary.config({
      cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY
    })

    await cloudinary.uploader.upload(inputs.url,(error,result)=> {
      if(error) {
        console.log(error);
        url['hasError'] = true;
        url['error'] = error;
      }
      if(result) {
        console.log(result.url);
        url['hasError'] = false;
        url['data'] = result
      }
    })
    return url;
  }


};
