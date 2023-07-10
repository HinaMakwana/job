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


  module.exports.constant = {
    HttpStatusCode,
    WorkType,
    jobType,
    role
  }