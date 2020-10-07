const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const dbLocation = './api/db.json';
const userLocation = './api/users.json';

const server = jsonServer.create();
const router = jsonServer.router(dbLocation);
const userdb = function() {return JSON.parse(fs.readFileSync(userLocation, 'utf-8'))};

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(jsonServer.defaults({noCors: false}));

const SECRET_KEY = '123456789';
const expiresIn = '24h';

// Creates Token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

// Verify the Token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
}

// Check if user exists in database
function isAuthenticated({username, password}) {
  return userdb().users.findIndex(user => user.username === username && user.password === password) !== -1;
}

//Register
server.post('/auth/register', (req, res) => {
  console.log("Register endpoint called; request body: ");
  console.log(req.body);
  const {username, password, firstName, lastName} = req.body;

  if (isAuthenticated({username, password}) === true) {   //if user already exists
    const status = 401;
    const message = 'Username and Password already exist';
    res.status(status).json({status, message});
    return;
  }
  fs.readFile(userLocation, (err, data) => {  //else add new user
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({status, message});   //something happened and I don't know what
      return;
    }

    //Get current User Data
    var data = JSON.parse(data.toString());
    //Get id of last user
    var last_item_id = data.users[data.users.length - 1].id;
    //Add new user
    data.users.push({
      id: last_item_id + 1,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName
    })
    var writeData = fs.writeFile(userLocation, JSON.stringify(data), (err, result) => {
      if (err) {
        const status = 401;       //unable to write to user.json
        const message = err;
        res.status(status).json({status, message});
        return;
      }
    })
  });
  //Create token for new user
  const access_token = createToken({username, password})
  console.log("Access Token: " + access_token);
  res.status(200).json({access_token});
  return;
});

//Login
server.post('/auth/login', (req, res) => {
  console.log("Login Called; request body: ");
  console.log(req.body);
  const {username, password} = req.body;
  if (isAuthenticated({username, password}) === false) {    //if not correct
    const status = 401;
    const message = 'Username or Password is Incorrect';
    res.status(status).json({status, message});
    return
  }
  const access_token = createToken({username, password});
  const index = userdb().users.findIndex(user => user.username === username && user.password === password);
  let user = userdb().users[index];
  user["token"] = access_token;
  res.status(200).json(user);
})

//Edit User
server.post('/auth/update', (req, res) => {
  console.log("Update Called; request body: ");
  console.log(req.body);
  const {id, username, password, newPassword, firstName, lastName, email, address, phone, token} = req.body;
  if (isAuthenticated({username, password}) !== true) { //Not the User
    console.log("invalid login");
    const status = 401;
    const message = 'Invalid Username and Password';
    res.status(status).json({status, message});
    return;
  }
  fs.readFile(userLocation, (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({status, message}); //something happened and I don't know what
      return;
    }

    //get current user data
    var data = JSON.parse(data.toString());
    //get the user
    const index = userdb().users.findIndex(user => user.username === username && user.password === password);
    data.users[index] = {
      id: id,
      username: username,
      password: (newPassword ? newPassword : password),
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      phone: phone
    };
    let user = data.users[index];
    var writeData = fs.writeFile(userLocation, JSON.stringify(data), (err, result) => {
      if (err) {
        const status = 401;       //unable to write to user.json
        const message = err;
        res.status(status).json({status, message});
        return;
      }
    });
    user.token = token;
    res.status(200).json(user);
  })
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization == undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    //if not proper format
    const status = 401;
    const message = 'Error in authorization format';
    res.status(status).json({status, message});
    return
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {   //if no token
      const status = 401;
      const message = 'Access token not provided';
      res.status(status).json({status, message});
      return;
    }
    //console.log(verifyTokenResult);   //Decode Secret
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error access_token revoked';
    res.status(status).json({status, message});
  }
})

server.use('/api', router);   //Run the JSON-Server with the /api/ call

server.listen(3000, () => {
  console.log('Run Auth API Server');
})
