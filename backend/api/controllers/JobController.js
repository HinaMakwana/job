/**
 * JobController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const id = sails.config.custom;
const Statuscode = sails.config.constant.HttpStatusCode;
let message = sails.config.getMessage;
module.exports = {
  /**
   * @description post job for users
   * @route (POST job/post)
   */
  post: async (req,res) => {
    const userId = req.userData.userId;
    let lang = req.getLocale();
    try {
      const user = await sails.helpers.commonFun(userId);
<<<<<<< HEAD
      let {title, company, workplaceType, jobLocation, jobType, description} = req.body;
=======
      let {
        title,
        company,
        workplaceType,
        jobLocation,
        jobType,
        description
      } = req.body;
>>>>>>> 9afe1f2f565dd9a0891cfff02254c671018fd50e
      if(user.role === 'manager') {
        const result = Job.validateBeforeCreateOrUpdate({
          title,company,workplaceType,jobLocation,jobType,description
        })
        if(result.hasError) {
          return res.status(Statuscode.BAD_REQUEST).json({
            message : message("Validation",lang),
            errors : result
          })
        }
        let findTitle = await Job.findOne({
          title: title,
          isDeleted: false,
          postedBy: userId
        })
        if(findTitle) {
          return res.status(Statuscode.CONFLICT).json({
            status: Statuscode.CONFLICT,
            message : message("Job.AlreadyPosted",lang)
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
        let postJob = await Job.create(data).fetch();
        return res.status(Statuscode.CREATED).json({
          status: Statuscode.CREATED,
          message: message("Job.Posted",lang),
          jobDetails: postJob
        })
        } else {
          return res.status(Statuscode.UNAUTHORIZED).json({
            status: Statuscode.UNAUTHORIZED,
            message: message("Unauthorized",lang)
          })
        }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError",lang) + error
      })
    }
  },
  /**
   * @description update job post
   * @route (PATCH job/update)
   */
  updateJob: async (req,res) => {
    const userId = req.userData.userId;
    let lang = req.getLocale();
    try {
<<<<<<< HEAD
      const user = await sails.helpers.commonFun(userId)
      if(user.role === 'manager') {
        let {description,jobId} = req.body
        let result = Job.validateBeforeCreateOrUpdate({description})
=======
      const user = await sails.helpers.commonFun(userId);
      if(user.role === 'manager') {
        let {
          description,
          jobId
        } = req.body;
        let result = Job.validateBeforeCreateOrUpdate({description});
>>>>>>> 9afe1f2f565dd9a0891cfff02254c671018fd50e
        if(result.hasError) {
          return res.status(Statuscode.BAD_REQUEST).json({
            status: Statuscode.BAD_REQUEST,
            error: result
          })
        }
        let findJob = await Job.findOne({
          id: jobId,
          isDeleted: false
        })
        if(!findJob) {
          return res.status(Statuscode.NOT_FOUND).json({
            status: Statuscode.NOT_FOUND,
            message: message("Job.NotFound",lang)
          })
        }
        let updateJob = await Job.update({
          postedBy: user.id,
          id: jobId
        },
        {
          description:description
        }).fetch()
        return res.status(Statuscode.OK).json({
          status: Statuscode.OK,
          message: message("Job.Updated",lang),
          Data: updateJob
        })
      } else {
        return res.status(Statuscode.UNAUTHORIZED).json({
          status: Statuscode.UNAUTHORIZED,
          message: message("Unauthorized",lang)
        })
      }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError",lang)
      })
    }
  },
  /**
   * @description delete job post
   * @route (DELETE job/delete)
   */
  deleteJob: async (req,res) => {
    const userId = req.userData.userId;
    let lang = req.getLocale();
    try {
      let user = await sails.helpers.commonFun(userId);
<<<<<<< HEAD
      let { jobId } = req.body
      if(user.role === 'manager') {
        let findId = await Job.findOne({id: jobId,isDeleted:false})
=======
      let { jobId } = req.body;
      if(user.role === 'manager') {
        let findId = await Job.findOne({
          id: jobId,
          isDeleted:false,
          postedBy: userId
        });
>>>>>>> 9afe1f2f565dd9a0891cfff02254c671018fd50e
        if(!findId) {
          return res.status(Statuscode.NOT_FOUND).json({
            status: Statuscode.NOT_FOUND,
            message: message("Job.NotFound",lang)
          })
        }
        const deleteJob = await Job.updateOne({
          id: findId.id,
          postedBy: userId
        },
        {isDeleted: true})
        .fetch()
        if(deleteJob) {
          return res.status(Statuscode.OK).json({
            status: Statuscode.OK,
            message: message("Job.Deleted",lang),
          })
        }
      } else {
        return res.status(Statuscode.UNAUTHORIZED).json({
          status: Statuscode.UNAUTHORIZED,
          message: 'unauthorized'
        })
      }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError",lang)
      })
    }
  },
  /**
   * @description list all posted job
   * @route (GET job)
   */
  listAllJob: async (req,res) => {
    let lang = req.getLocale();
    try {
      const limit = 4;
      let {page} = req.query;
      if(page === undefined) {
        page = 1;
      }
      let skip = (page - 1) * limit;
      let allJobs;
      await Job.find({isDeleted:false})
      .skip(skip)
      .limit(limit)
      .populate('postedBy')
      .populate('likeByUsers')
      .then((data)=>{
        data.forEach((like)=>{
          like.likeByUsers = like.likeByUsers.length;
          like.postedBy = _.omit(
            like.postedBy,
            "createdAt",
            "updatedAt",
            "password",
            "token",
            "forgetPassToken",
            "forgetPassExpTime"
          )
        })
        allJobs = data;
      })
      let countAllJob = await Job.count({isDeleted:false});
      if(!allJobs[0]) {
        return res.status(Statuscode.BAD_REQUEST).json({
          status: Statuscode.BAD_REQUEST,
          message: message("BadRequest",lang)
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
        message: message("ServerError",lang) + error
      })
    }
  },
  /**
   * @description list all job of particular user
   * @route (GET job/list)
   */
  listJob: async (req,res) => {
    const userId = req.userData.userId;
    let lang = req.getLocale();
    try {
      const user = await sails.helpers.commonFun(userId);
      let allJobs = await Job.find({
        postedBy:user.id,
        isDeleted:false
      })
      .populate('likeByUsers',
      {
        limit:3,
        select:['firstName','lastName','email']
      })
      if(!allJobs[0]) {
        return res.status(Statuscode.BAD_REQUEST).json({
          status: Statuscode.BAD_REQUEST,
          message: message("BadRequest",lang)
        })
      }
      return res.status(Statuscode.OK).json({
        status: Statuscode.OK,
        List: allJobs
      })
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError",lang) + error
      })
    }
  },
  /**
   * @description listOne job post
   * @route (GET job/listone)
   */
  listOne: async (req,res) => {
    const userId = req.userData.userId;
    let lang = req.getLocale();
    let result;
    try {
      let {id} = req.params;
      await sails.helpers.commonFun(userId);
      let getOneJob = await Job.findOne({
        id:id,
        isDeleted: false
      })
      .populate('postedBy')
      .populate('likeByUsers',{
        where: {
          id:userId,
          isDeleted: false
        },
        select:['firstName','lastName','email']
      })
      if(!getOneJob) {
        return res.status(Statuscode.NOT_FOUND).json({
          status: Statuscode.NOT_FOUND,
          message: message("Job.NotFound",lang)
        })
      }
      if(getOneJob.user === userId) {
        result = true;
      } else {
        result = false;
      }
      getOneJob = _.omit(getOneJob,"createdAt",
        "updatedAt",
        "user"
      )
      getOneJob.postedBy = _.omit(getOneJob.postedBy,"createdAt",
      "updatedAt",
      "token",
      "password",
      "forgetPassToken",
      "forgetPassExpTime"
      )
      return res.status(Statuscode.OK).json({
        status: Statuscode.OK,
        data: getOneJob,
        result : result,
        totalLike: getOneJob.likeByUsers.length
      })
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError",lang) + error
      })
    }
  },
  /**
   * @description search job
   * @route (POST job/search)
   */
  searchJob: async (req,res) => {
    const userId = req.userData.userId;
    let lang = req.getLocale();
    try {
      let {title} = req.body
      const limit = 4;
      let {page} = req.query;
      if(page === undefined) {
        page = 1;
      }
      let skip = (page - 1) * limit;
      let user = await sails.helpers.commonFun(userId);
      if(user.role === 'client') {

      let query = `SELECT
                "j"."id",
                "j"."title",
                "j"."company",
                "j"."jobLocation",
                COUNT("l"."likedPost") AS "likeByUsers"
                FROM "job" AS "j"
                FULL JOIN "user" AS "u"
                ON "j"."postedBy"="u"."id"
                LEFT JOIN "like" AS "l"
                ON "j"."id"="l"."likedPost"
                WHERE lower("j"."title") LIKE '%' || lower('${title}') || '%'
                AND "j"."isDeleted" = false
                GROUP BY "j"."id"`
      const search = await sails.sendNativeQuery(query, []);
      let query2 = ` ORDER BY title LIMIT ${limit} OFFSET ${skip}`
      let total = query.concat(query2);
      const data = await sails.sendNativeQuery(total,[]);
        /* const data = await sails.sendNativeQuery(query,[title])
        const search = await Job.find({where: {
          title: {'like' : '%' + title + '%'},
          isDeleted : false
        }})
        const search = await Job.find({
          where: {
            title: {'contains': title},
            isDeleted: false
          }
        }); */
        return res.status(Statuscode.OK).json({
          status: Statuscode.OK,
          data: data,
          count: search.rows.length
        })
      } else {
        return res.status(Statuscode.UNAUTHORIZED).json({
          status: Statuscode.UNAUTHORIZED,
          message: message("Unauthorized",lang)
        })
      }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError",lang) + error,
        error: error
      })
    }
  },
  /**
   * @description apply for job
   * @route (POST apply)
   */
  applyJob: async (req,res) => {
    const userId = req.userData.userId;
    let lang = req.getLocale();
    try {
      const user = await sails.helpers.commonFun(userId);
      if(user.role === 'client') {
        const {managerEmail,postId} = req.body;
        let findPost = await Job.findOne({
          id:postId,
          isDeleted: false
        })
        if(!findPost) {
          return res.status(Statuscode.NOT_FOUND).json({
            status: Statuscode.NOT_FOUND,
            message: message("Job.NotFound",lang)
          })
        }
        let sendEmail = await sails.helpers.sendMail(
          managerEmail,
          user.email,
          user.firstName,
          findPost.title
        )
        if(sendEmail.messageId) {
          return res.status(Statuscode.OK).json({
            status: Statuscode.OK,
            message: message("Job.SendMail",lang)
          })
        }
      }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError",lang) + error
      })
    }
  },

};
