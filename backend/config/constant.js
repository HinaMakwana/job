  const HttpStatusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    SERVER_ERROR: 500,
  };

  const WorkType = {
    home : 'work from home',
    office : 'work from office'
  }

  const role = {
    manager : 'manager',
    client : 'client'
  }

  const jobType = {
    ft : 'full-time',
    pt : 'part-time',
    contract : 'contract'
  }
  const eduType = {
    ssc : 'SSC (10th)',
    hsc : 'HSC (12th)',
    degree : 'degree'
  }
  const currentyear = new Date().getFullYear()
  const validationRule = {
    User : {
      firstName : "required|min:3",
      lastName : "required|min:3",
      email : "required|email",
      password: [
        "required",
        "regex:/^[a-zA-Z0-9!@#$%^&*]{8,16}$/"
      ],
      confirmPassword: "same:password",
      role : [ "required", { "in" : [role.client, role.manager]}]
    },
    Job : {
      title: "required|min:2",
      company: "required|min:2",
      workplaceType: [
        "required",
        { "in" : [WorkType.home, WorkType.office]}
      ],
      jobLocation: "required|min:3",
      jobType: [
        "required",
        { "in" : [jobType.contract, jobType.ft, jobType.pt]}
      ],
      description: "required"
    },
    Education : {
      educationType: [
        "required",
        {"in" : [eduType.ssc,eduType.hsc,eduType.degree]}
      ],
      degreeName: [
        { required_if : ['educationType','degree']}
      ],
    instituteName : [
      {
        required_with : "educationType"
      }
    ],
    year : [
      { required_with : ["instituteName"]},
      {digits:4},
    ],
    grade : [
      { required_with : ["year"]}
    ],
    }
  }

  module.exports.constant = {
    HttpStatusCode,
    WorkType,
    jobType,
    role,
    validationRule,
    eduType,
  }