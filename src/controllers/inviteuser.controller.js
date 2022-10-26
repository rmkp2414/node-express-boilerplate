const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { inviteuserService } = require('../services');


const createInviteUser = catchAsync(async (req, res) => {
  const inviteuser = await inviteuserService.createInviteUser(req.body.values);
  res.status(httpStatus.CREATED).send(inviteuser);
});

const getInviteUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await inviteuserService.queryInviteUsers(filter, options);
  res.send(result);
});

const getInviteUser = catchAsync(async (req, res) => {
  const inviteuser = await inviteuserService.getInviteUserByCode(req.params.code);
  if (!inviteuser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(inviteuser);
});

const updateInviteUser = catchAsync(async (req, res) => {
  const inviteuser = await inviteuserService.updateInviteUserById(req.params.inviteuserId, req.body);
  res.send(inviteuser);
});

const deleteInviteUser = catchAsync(async (req, res) => {
  await inviteuserService.deleteInviteUserById(req.params.inviteuserId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createInviteUser,
  getInviteUsers,
  getInviteUser,
  updateInviteUser,
  deleteInviteUser,
};
