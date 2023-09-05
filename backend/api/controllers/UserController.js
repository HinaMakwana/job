/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const id = sails.config.custom;
const bcrypt = sails.config.custom.bcrypt;
const jwt = sails.config.custom.jwt;
const Statuscode = sails.config.constant.HttpStatusCode;
const message = sails.config.getMessage;
module.exports = {
  /**
   * @description register user in database
   * @route (POST /user/signup)
   */
  signup: async (req, res) => {
    try {
      let lang = req.getLocale();
      let { firstName, lastName, email, password, confirmPassword, role } =
        req.body;
      let result = User.ValidationBeforeCreate({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        role,
      });
      if (result.hasError) {
        return res.status(Statuscode.BAD_REQUEST).json({
          message: message("Validation", lang),
          errors: result,
        });
      }
      let findUser = await User.findOne({
        email: email,
        isDeleted: false,
      });
      if (findUser) {
        return res.status(Statuscode.CONFLICT).json({
          status: Statuscode.CONFLICT,
          message: message("User.Exist", lang),
        });
      }
      const pass = await bcrypt.hash(password, 10);
      if (!pass) {
        return res.status(Statuscode.SERVER_ERROR).json({
          status: Statuscode.SERVER_ERROR,
          message: message("ServerError", lang),
        });
      }
      const data = {
        id: id.uuid(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: pass,
        role: role,
      };
      const createUser = await User.create(data).fetch();

      // await sails.helpers.sendMail(email,firstName)
      return res.status(Statuscode.CREATED).json({
        message: message("User.Created", lang),
        User: createUser,
      });
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError", lang),
      });
    }
  },
  /**
   * @description login user
   * @route (POST /user/login)
   */
  login: async (req, res) => {
    let lang = req.getLocale();
    let { email, password } = req.body;
    try {
      let findUser = await User.findOne({
        email: email,
        isDeleted: false,
      });
      if (!findUser) {
        return res.status(Statuscode.NOT_FOUND).json({
          status: Statuscode.NOT_FOUND,
          message: message("User.InvalidEmail", lang),
        });
      }
      const isCompare = await bcrypt.compare(password, findUser.password);
      if (!isCompare) {
        return res.status(Statuscode.FORBIDDEN).json({
          status: Statuscode.FORBIDDEN,
          message: message("User.Invalid", lang),
        });
      }
      const token = jwt.sign(
        {
          email: findUser.email,
          userId: findUser.id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "8h",
        }
      );
      await User.update({ email: findUser.email }, { token: token });
      return res.status(Statuscode.OK).json({
        status: Statuscode.OK,
        message: message("User.Login", lang),
        token: token,
        role: findUser.role,
        name: findUser.firstName.concat(" ", findUser.lastName),
        email: findUser.email,
      });
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError", lang),
      });
    }
  },
  /**
   * @description Logout user
   * @route (POST /user/logout)
   */
  logout: async (req, res) => {
    try {
      let lang = req.getLocale();
      const userId = req.userData.userId;
      const findUser = await User.findOne({
        id: userId,
        isDeleted: false,
      });
      if (!findUser) {
        return res.status(Statuscode.NOT_FOUND).json({
          status: Statuscode.NOT_FOUND,
          message: message("User.UserNotFound", lang),
        });
      }
      const logoutUser = await User.update(
        { id: userId },
        { token: null }
      ).fetch();

      if (logoutUser) {
        return res.status(Statuscode.OK).json({
          status: Statuscode.OK,
          message: message("User.Logout", lang),
        });
      } else {
        return res.status(Statuscode.SERVER_ERROR).json({
          status: Statuscode.SERVER_ERROR,
          message: message("ServerError", lang),
        });
      }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError", lang),
      });
    }
  },
  /**
   * @description see profile of user
   * @route (GET /user/profile)
   */
  myProfile: async (req, res) => {
    const userId = req.userData.userId;
    let lang = req.getLocale();
    try {
      let getUserProfile = await User.findOne({
        id: userId,
        isDeleted: false,
      })
        .select(["firstName", "lastName", "email", "role", "imageUrl"])
        .populate("likePosts", {
          omit: ["createdAt", "updatedAt", "isDeleted"],
        })
        .populate("moreData")
        .populate("Education", {
          omit: ["createdAt", "updatedAt"],
        });
      res.status(Statuscode.OK).json({
        status: Statuscode.OK,
        user: getUserProfile,
      });
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError", lang) + error,
      });
    }
  },
  /**
   * @description watch other user profile
   * @Route GET /user/:id
   */
  profile: async (req, res) => {
    let lang = req.getLocale();
    try {
      let id = req.params.id;
      let userData = await User.findOne({
        id: id,
        isDeleted: false,
      })
        .select(["firstName", "lastName", "email", "role", "imageUrl"])
        .populate("likePosts", {
          omit: ["createdAt", "updatedAt", "isDeleted"],
        })
        .populate("moreData")
        .populate("Education", {
          omit: ["createdAt", "updatedAt"],
        });
      res.status(Statuscode.OK).json({
        status: Statuscode.OK,
        user: userData,
      });
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError", lang),
      });
    }
  },
  /**
   * @description list all logged users
   * @Route GET /list/users
   */
  listAllUsers: async (req, res) => {
    let lang = req.getLocale();
    try {
      let findAllUsers = await User.find({
        isDeleted: false,
        role: "client",
      })
        .select(["firstName", "lastName", "email", "role", "imageUrl"])
        .populate("moreData");

      return res.status(Statuscode.OK).json({
        data: findAllUsers,
      });
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        message: message("ServerError", lang) + error,
      });
    }
  },
  /**
   * @description add education detail of user
   * @Route Post /add/education
   */
  addEducation: async (req, res) => {
    const lang = req.getLocale();
    const userId = req.userData.userId;
    const currentyear = new Date().getFullYear();
    try {
      let user = await sails.helpers.commonFun(userId);
      let {
        educationType,
        instituteName,
        year,
        grade,
        degreeName
      } = req.body;
      let result = await Education.ValidationBeforeCreate({
        educationType,
        instituteName,
        year,
        grade,
        degreeName,
      });
      if (result.hasError) {
        return res.status(Statuscode.FORBIDDEN).json({
          status: Statuscode.FORBIDDEN,
          message: message("Validation", lang),
          error: result.error,
        });
      }
      if (user.role === "client") {
        let eduData = {
          id: id.uuid(),
          educationType: educationType,
          instituteName: instituteName,
          year: year,
          grade: grade,
          userData: userId,
        };
        let validateData = await Education.findOne({
          educationType: educationType,
          degreeName: degreeName,
        });
        if (validateData) {
          return res.status(Statuscode.CONFLICT).json({
            status: Statuscode.CONFLICT,
            message: message("Education.Confict", lang),
          });
        } else {
          let checkYear = await Education.findOne({ year: year });
          if (checkYear) {
            return res.status(Statuscode.BAD_REQUEST).json({
              status: Statuscode.BAD_REQUEST,
              message: message("Education.ConflictYear", lang),
            });
          } else if (year > currentyear) {
            return res.status(Statuscode.BAD_REQUEST).json({
              status: Statuscode.BAD_REQUEST,
              message: message("Education.ConflictYear", lang),
            });
          }
        }
        let addEducation = await Education.create({
          ...eduData,
          degreeName: degreeName,
        }).fetch();
        await User.addToCollection(userId, "Education", addEducation.id);
        return res.status(Statuscode.CREATED).json({
          status: Statuscode.CREATED,
          message: message("Education.Added", lang),
          data: addEducation,
        });
      } else {
        return res.status(Statuscode.UNAUTHORIZED).json({
          status: Statuscode.UNAUTHORIZED,
          message: message("Unauthorized", lang),
        });
      }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError", lang) + error,
      });
    }
  },
  /**
   * @description add more information about user
   * @Route POST /add/moreInfo/:id
   */
  addMoreInfo: async (req, res) => {
    const lang = req.getLocale();
    try {
      const userId = req.params.id;
      let user = await sails.helpers.commonFun(userId);
      let { Headline, Skill, Location } = req.body;
      if (user.role === "client") {
        let eduData = {
          id: id.uuid(),
          Headline: Headline,
          Skill: Skill,
          Location: Location,
          user: userId,
        };
        let findData = await MoreInfo.findOne({ user: userId });
        if (findData) {
          return res.status(Statuscode.BAD_REQUEST).json({
            status: Statuscode.BAD_REQUEST,
            message: message("BadRequest", lang),
          });
        }
        let createMoreInfo = await MoreInfo.create(eduData).fetch();
        await User.update({ id: userId }, { moreData: createMoreInfo.id });
        return res.status(Statuscode.CREATED).json({
          status: Statuscode.CREATED,
          data: createMoreInfo,
        });
      } else {
        return res.status(Statuscode.UNAUTHORIZED).json({
          status: Statuscode.UNAUTHORIZED,
          message: message("Unauthorized", lang),
        });
      }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError", lang),
      });
    }
  },
  /**
   * @description update user profile
   * @Route PATCH /update/profile
   */
  updateProfile: async (req, res) => {
    const lang = req.getLocale();
    const userId = req.userData.userId;
    try {
      let user = await sails.helpers.commonFun(userId);
      let { Headline, Skill, Location, firstName, lastName } = req.body;
      if (user.role === "client") {
        let moreData = {
          Headline: Headline,
          Skill: Skill,
          Location: Location,
        };
        let findData = await MoreInfo.findOne({ user: userId });
        if (findData && user) {
          let updateInfo = await MoreInfo.update(
            { user: userId },
            moreData
          ).fetch();
          let updateProfile = await User.updateOne(
            {
              id: userId,
            },
            {
              firstName: firstName,
              lastName: lastName,
            }
          );
          updateProfile = _.omit(
            updateProfile,
            "createdAt",
            "updatedAt",
            "password",
            "token",
            "forgetPassToken",
            "forgetPassExpTime",
            "moreData"
          );
          return res.status(Statuscode.OK).json({
            status: Statuscode.OK,
            data: updateProfile,
            data1: updateInfo,
          });
        }
      } else {
        return res.status(Statuscode.UNAUTHORIZED).json({
          status: Statuscode.UNAUTHORIZED,
          message: message("Unauthorized", lang),
        });
      }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        status: Statuscode.SERVER_ERROR,
        message: message("ServerError", lang) + error,
      });
    }
  },
  /**
   * @description list logged in users saved posts
   * @route (GET /list)
   */
  listSavedPost: async (req, res) => {
    const lang = req.getLocale();
    const userId = req.userData.userId;
    try {
      let findPosts = await User.findOne({
        id: userId,
        isDeleted: false,
        role: "client",
      })
        .omit([
          "token",
          "password",
          "isDeleted",
          "createdAt",
          "updatedAt",
          "forgetPassToken",
          "forgetPassExpTime",
        ])
        .populate("savedPosts", { omit: ["createdAt", "updatedAt"] });
      return res.status(Statuscode.OK).json({
        data: findPosts,
      });
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        message: message("ServerError", lang) + error,
      });
    }
  },
  /**
   * @description forget password api for user
   * @route (PATCH /forgetPass)
   */
  forgetPassword: async (req, res) => {
    const lang = req.getLocale();
    try {
      let { email } = req.body;
      let findEmail = await User.findOne({ email: email, isDeleted: false });
      if (!findEmail) {
        return res.status(Statuscode.NOT_FOUND).json({
          message: "Email is invalid",
        });
      }
      let expiryToken = id.uuid();
      let expiryTime = Math.floor(Date.now()) + 120000;
      let updateUser = await User.update(
        { email: email },
        { forgetPassToken: expiryToken, forgetPassExpTime: expiryTime }
      ).fetch();
      if (updateUser) {
        return res.status(Statuscode.OK).json({
          message: "Forget password token generated",
          token: expiryToken,
        });
      }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        message: message("ServerError", lang),
      });
    }
  },
  /**
   *
   * @description reset password
   * @param {Request} req
   * @param {Response} res
   * @returns updated pasword in json format
   * @route (PATCH /resetPass)
   */
  resetPassword: async (req, res) => {
    const lang = req.getLocale();
    try {
      let { forgetPassToken, newPassword, confirmPassword } = req.body;
      let findToken = await User.findOne({
        forgetPassToken: forgetPassToken,
        isDeleted: false,
      });
      if (!findToken) {
        return res.status(Statuscode.BAD_REQUEST).json({
          message: "Bad request",
        });
      }
      if (findToken.forgetPassExpTime < Date.now()) {
        return res.status(Statuscode.FORBIDDEN).json({
          message: "token expired",
        });
      }
      if (newPassword !== confirmPassword) {
        return res.status(Statuscode.BAD_REQUEST).json({
          message: "password and confirm password must match",
        });
      }
      let pass = await bcrypt.hash(newPassword, 10);
      if (!pass) {
        return res.status(Statuscode.SERVER_ERROR).json({
          message: "server Error",
        });
      }
      let updatePass = await User.update(
        { email: findToken.email },
        {
          password: pass,
          forgetPassToken: null,
          forgetPassExpTime: null,
        }
      ).fetch();
      if (updatePass) {
        return res.status(Statuscode.OK).json({
          message: "Password updated",
        });
      }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        message: message("ServerError", lang) + error,
      });
    }
  },
  /**
   * @description reset password api for user
   * @route (PATCH /changePass)
   */
  changePassword: async (req, res) => {
    const lang = req.getLocale();
    const userId = req.userData.userId;
    try {
      let {
        oldPassword,
        newPassword,
        confirmPassword
      } = req.body;
      let user = await sails.helpers.commonFun(userId);
      let comparePass = await bcrypt.compare(oldPassword, user.password);
      if (!comparePass) {
        return res.status(Statuscode.BAD_REQUEST).json({
          message: "password invalid",
        });
      }
      //check newpassword and confirmPassword must match
      if (newPassword !== confirmPassword) {
        return res.status(Statuscode.BAD_REQUEST).json({
          message: "password and confirm password must match",
        });
      }
      let pass = await bcrypt.hash(newPassword, 10);
      if (!pass) {
        return res.status(Statuscode.SERVER_ERROR).json({
          message: "server Error",
        });
      }
      let updatePass = await User.update(
        { id: userId },
        { password: pass }
      ).fetch();
      if (updatePass) {
        return res.status(Statuscode.OK).json({
          message: "Password updated",
        });
      }
    } catch (error) {
      return res.status(Statuscode.SERVER_ERROR).json({
        message: message("ServerError", lang) + error,
      });
    }
  },
};
