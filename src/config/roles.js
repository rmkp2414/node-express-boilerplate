const allRoles = {
  user:  ['getUsers','getAnalysisTypes',
  'getFirms','manageFirms',
  'getCoordinateSystems','manageCoordinateSystems',
  'getDatumSystems',',manageDatumSystems',
  'getProjects','manageProjects'
],
  admin: ['getUsers', 'manageUsers',
  'getAnalysisTypes','manageAnalysisTypes',
  'getFirms','manageFirms',
  'getCoordinateSystems','manageCoordinateSystems',
  'getDatumSystems','manageDatumSystems',
  'getProjects','manageProjects'
],
  // firmadmin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
