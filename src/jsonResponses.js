const users = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const notReal = (request, response) => {
  const responseJSON = {
    message: 'This function is Not Real',
    id: 'notReal',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notRealMeta = (request, response) => respondJSONMeta(request, response, 404);

const addUser = (request, response, data) => {
  
  if(!data.name || !data.age)
  {
    const responseJSON = {
      message: 'Please fill out all data fields.',
      id: 'missingData',
    };
  
    return respondJSON(request, response, 400, responseJSON);
  }
  
  const newUser = {
    name: data.name,
    age: data.age,
    // Good practice
    createdAt: Date.now(),
  };
  
  if(users[newUser.name]) {
    users[newUser.name].age = data.age;
    //Good practice
    users[newUser.name].updatedOn = newUser.createdAt;
    return respondJSON(request, response, 204, newUser);
  } else {
    users[newUser.name] = newUser;
    return respondJSON(request, response, 201, newUser);
  }
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  getUsers,
  getUsersMeta,
  notReal,
  notRealMeta,
  addUser,
  notFound,
  notFoundMeta,
};
