const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService,fileService } = require('../services');


const uploadFile = require("../middlewares/upload");

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Upload a file please!" });
    }

    const file = await fileService.saveFile(req.file);


    res.status(200).send({
      message: "The following file was uploaded successfully: " + req.file.originalname,
    });
    // res.status(httpStatus.CREATED).send("file");
  } catch (err) { //\\ error handling
    res.status(500).send({
      message: `Unable to upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

module.exports = upload;


const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const createFile = catchAsync(async (req, res) => {
  const file = await fileService.saveFile(req.file);
  res.status(httpStatus.CREATED).send(file);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createFile,
  upload
};
