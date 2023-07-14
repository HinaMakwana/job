
/**
 * JobController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const id = sails.config.custom;
const Statuscode = sails.config.constant.HttpStatusCode;

module.exports = {
  /**
   * @description post job for users
   * @route (POST job/post)
   */
  post: async (req,res) => {
    const userId = req.userData.userId;
    try {
      const user = await sails.helpers.commonFun(userId);
      let {title, company,workplaceType,jobLocation,jobType,description} = req.body
      if(user.role == 'manager') {
        let findTitle = await Job.findOne({title: title, isDeleted: false,postedBy: userId})
        if(findTitle) {
          return res.status(Statuscode.CONFLICT).json({
            status: Statuscode.CONFLICT,
            message : 'You have already posted this title of job'
          })
        }
        const data = {
          id : id.uuid(),
          title : title,
          company : company,
          workplaceType : workplaceType,
          jobLocation : jobLocation,
          jobType : jobType,
          postedBy : user.id,
          description : description
        }
        let postJob = await Job.create(data).fetch()
        return res.status(Statuscode.CREATED).json({
          status: Statuscode.CREATED,
          message: 'job posted successfully',
          jobDetails: postJob
        })
        } else {
          return res.status(Statuscode.UNAUTHORIZED).json({
            status: Statuscode.UNAUTHORIZED,
            message: 'user unauthorized'
          })
        }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: "Server Error!" + error
      })
    }
  },
  /**
   * @description update job post
   * @route (PATCH job/update)
   */
  updateJob: async (req,res) => {
    const userId = req.userData.userId;
    try {
      const user = await sails.helpers.commonFun(userId)
      let {title,description,jobId} = req.body
      let findJob = await Job.findOne({id: jobId,isDeleted: false})
      if(!findJob) {
        return res.status(Statuscode.NOT_FOUND).json({
          status: Statuscode.NOT_FOUND,
          message: 'Job not found'
        })
      }
      const data = {
        title : title,
        description : description
      }
      let updateJob = await Job.update({postedBy: user.id},data).fetch()
      return res.status(Statuscode.OK).json({
        status: Statuscode.OK,
        message: 'updated successfully',
        Data: updateJob
      })
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: "Server Error"
      })
    }

  },
  /**
   * @description delete job post
   * @route (DELETE job/delete)
   */
  deleteJob: async (req,res) => {
    const userId = req.userData.userId;
    try {
      await sails.helpers.commonFun(userId);
      let { jobId } = req.body
      let findId = await Job.findOne({id: jobId,isDeleted:false})
      if(!findId) {
        return res.status(Statuscode.NOT_FOUND).json({
          status: Statuscode.NOT_FOUND,
          message: 'job post not found'
        })
      }
      const deleteJob = await Job.update({id: findId.id},{isDeleted: true}).fetch()
      if(deleteJob) {
        return res.status(Statuscode.OK).json({
          status: Statuscode.OK,
          message: 'Job deleted',
        })
      }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: "Server Error"
      })
    }
  },
  /**
   * @description list all posted job
   * @route (GET job)
   */
  listAllJob: async (req,res) => {
    try {
      const limit = 4;
      let {page} = req.query;
      if(page == undefined) {
        page = 1;
      }
      let skip = (page - 1) * limit
      let allJobs = await Job.find({isDeleted:false}).skip(skip).limit(limit).populate('postedBy')
      let countAllJob = await Job.count({isDeleted:false})
      if(!allJobs[0]) {
        return res.status(Statuscode.BAD_REQUEST).json({
          status: Statuscode.BAD_REQUEST,
          message: 'received bad request'
        })
      }
      return res.status(Statuscode.OK).json({
        status: Statuscode.OK,
        List: allJobs,
        count:countAllJob
      })
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: "Server Error" + error
      })
    }
  },
  /**
   * @description list all job of particular user
   * @route (GET job/list)
   */
  listJob: async (req,res) => {
    const userId = req.userData.userId
    try {
      const user = await sails.helpers.commonFun(userId)
      let allJobs = await Job.find({postedBy:user.id,isDeleted:false})
      if(!allJobs[0]) {
        return res.status(Statuscode.BAD_REQUEST).json({
          status: Statuscode.BAD_REQUEST,
          message: 'received bad request'
        })
      }
      return res.status(Statuscode.OK).json({
        status: Statuscode.OK,
        List: allJobs
      })
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: "Server Error"
      })
    }
  },
  /**
   * @description listOne job post
   * @route (POST job/listone)
   */
  listOne: async (req,res) => {
    const userId = req.userData.userId
    try {
      let {id} = req.params
      await sails.helpers.commonFun(userId)
      let getOneJob = await Job.findOne({id:id}).populate('postedBy')
      if(!getOneJob) {
        return res.status(Statuscode.NOT_FOUND).json({
          status: Statuscode.NOT_FOUND,
          message: 'post not found'
        })
      }
      return res.status(Statuscode.OK).json({
        status: Statuscode.OK,
        data: getOneJob
      })
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: "Server Error" + error
      })
    }
  },
  /**
   * @description search job
   * @route (POST job/search)
   */
  searchJob: async (req,res) => {
    const userId = req.userData.userId
    try {
      let {title} = req.body
      const limit = 3;
      let {page} = req.query;
      if(page == undefined) {
        page = 1;
      }
      let skip = (page - 1) * limit
      let user = await sails.helpers.commonFun(userId)
      if(user.role === 'client') {
      let query1 = `SELECT * FROM "job"
                 WHERE lower(title) LIKE '%' || lower($1) || '%'
                 AND "isDeleted" = false`
      let query2 = ` ORDER BY title LIMIT ${limit} OFFSET ${skip}`
      let query = query1.concat(query2)
        const search = await sails.sendNativeQuery(query1, [title])
        const data = await sails.sendNativeQuery(query,[title])
        // const search = await Job.find({where: {
        //   title: {'like' : '%' + title + '%'},
        //   isDeleted : false
        // }})
        // const search = await Job.find({
        //   where: {
        //     title: {'contains': title},
        //     isDeleted: false
        //   }
        // });
        return res.status(Statuscode.OK).json({
          status: Statuscode.OK,
          data: data,
          count: search.rows.length
        })
      } else {
        return res.status(Statuscode.SERVER_ERROR).json({
          status: Statuscode.SERVER_ERROR,
          message: "Server Error"
        })
      }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: "Server Error"
      })
    }
  },
  /**
   * @description apply for job
   * @route (POST apply)
   */
  applyJob: async (req,res) => {
    const userId = req.userData.userId
    try {
      const user = await sails.helpers.commonFun(userId)
      if(user.role === 'client') {
        const {managerEmail,postId} = req.body
        let findPost = await Job.findOne({id:postId})
        if(!findPost) {
          return res.status(Statuscode.NOT_FOUND).json({
            status: Statuscode.NOT_FOUND,
            message: 'Not found'
          })
        }
        await sails.helpers.sendMail(managerEmail,user.email,user.firstName,findPost.title)
        return res.status(Statuscode.OK).json({
          status: Statuscode.OK,
          message: 'email send'
        })
      }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: "Server Error"
      })
    }
  },
};
