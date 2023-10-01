/**
 * SavePostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const message = sails.config.getMessage;
const id = sails.config.custom.uuid;
const Statuscode = sails.config.constant.HttpStatusCode;

module.exports = {
  /**
   * @description save post in user account
   * @route (POST save/post)
   */
  savePost: async (req, res) => {
    let lang = req.getLocale();
    try {
      let { userId } = req.userData;
      let { jobId } = req.body;
      let findJob = await Job.findOne({
        id: jobId,
        isDeleted: false
      });
      if (!findJob) {
        return res.status(Statuscode.NOT_FOUND).json({
          message: "Job post not found",
        });
      }
      let findUser = await User.findOne({
        id: userId,
        isDeleted: false,
      }).populate("savedPosts", {
        where: {
          id: findJob.id,
          isDeleted: false
        },
      });
      if (findUser.savedPosts.length > 0) {
        await SavePost.destroy({
          users: userId,
          posts: jobId
        });
        return res.status(Statuscode.OK).json({
          message: "post removed from saved list",
        });
      }
      await SavePost.create({
        id: id(),
        users: userId,
        posts: jobId,
      }).fetch();
      return res.status(Statuscode.OK).json({
        message: "Post Saved",
      });
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError", lang) + error,
      });
    }
  },
};
