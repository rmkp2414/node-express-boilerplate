const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const boreholeValidation = require('../../validations/borehole.validation');
const boreholeController = require('../../controllers/borehole.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageBoreholes'), validate(boreholeValidation.createBorehole), boreholeController.createBorehole)
  .get(auth('getBoreholes'), validate(boreholeValidation.getBoreholes), boreholeController.getBoreholes);

router
.route('/cptu')
.get(auth('getUsers'),  boreholeController.getBoreholeByMethodAndId);

router
  .route('/:boreholeId')
  .get(auth('getBoreholes'), validate(boreholeValidation.getBorehole), boreholeController.getBorehole)
  .patch(auth('manageBoreholes'), validate(boreholeValidation.updateBorehole), boreholeController.updateBorehole)
  .delete(auth('manageBoreholes'), validate(boreholeValidation.deleteBorehole), boreholeController.deleteBorehole);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Boreholes
 *   description: Borehole management and retrieval
 */

/**
 * @swagger
 * /boreholes:
 *   post:
 *     summary: Create a borehole
 *     description: Only admins can create other boreholes.
 *     tags: [Boreholes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                  type: string
 *                  enum: [borehole, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: borehole
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Borehole'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all boreholes
 *     description: Only admins can retrieve all boreholes.
 *     tags: [Boreholes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Borehole name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Borehole role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of boreholes
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Borehole'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /boreholes/{id}:
 *   get:
 *     summary: Get a borehole
 *     description: Logged in boreholes can fetch only their own borehole information. Only admins can fetch other boreholes.
 *     tags: [Boreholes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Borehole id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Borehole'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a borehole
 *     description: Logged in boreholes can only update their own information. Only admins can update other boreholes.
 *     tags: [Boreholes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Borehole id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Borehole'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a borehole
 *     description: Logged in boreholes can delete only themselves. Only admins can delete other boreholes.
 *     tags: [Boreholes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Borehole id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */


// const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
// const userController = require('../../controllers/user.controller');
// const boreholeController = require('../../controllers/borehole.controller');

// const router = express.Router();

// router
//   .route('/')
//   .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
//   .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

//   router
//   .route('/cptu')
//   .get(auth('getUsers'), validate(userValidation.getUsers), boreholeController.getBoreholeByMethodAndId);

// router
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

// module.exports = router;

// /**
//  * @swagger
//  * tags:
//  *   name: Users
//  *   description: User management and retrieval
//  */

// /**
//  * @swagger
//  * /users:
//  *   post:
//  *     summary: Create a user
//  *     description: Only admins can create other users.
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *               - email
//  *               - password
//  *               - role
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *                 format: email
//  *                 description: must be unique
//  *               password:
//  *                 type: string
//  *                 format: password
//  *                 minLength: 8
//  *                 description: At least one number and one letter
//  *               role:
//  *                  type: string
//  *                  enum: [user, admin]
//  *             example:
//  *               name: fake name
//  *               email: fake@example.com
//  *               password: password1
//  *               role: user
//  *     responses:
//  *       "201":
//  *         description: Created
//  *         content:
//  *           application/json:
//  *             schema:
//  *                $ref: '#/components/schemas/User'
//  *       "400":
//  *         $ref: '#/components/responses/DuplicateEmail'
//  *       "401":
//  *         $ref: '#/components/responses/Unauthorized'
//  *       "403":
//  *         $ref: '#/components/responses/Forbidden'
//  *
//  *   get:
//  *     summary: Get all users
//  *     description: Only admins can retrieve all users.
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: name
//  *         schema:
//  *           type: string
//  *         description: User name
//  *       - in: query
//  *         name: role
//  *         schema:
//  *           type: string
//  *         description: User role
//  *       - in: query
//  *         name: sortBy
//  *         schema:
//  *           type: string
//  *         description: sort by query in the form of field:desc/asc (ex. name:asc)
//  *       - in: query
//  *         name: limit
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *         default: 10
//  *         description: Maximum number of users
//  *       - in: query
//  *         name: page
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *           default: 1
//  *         description: Page number
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 results:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/components/schemas/User'
//  *                 page:
//  *                   type: integer
//  *                   example: 1
//  *                 limit:
//  *                   type: integer
//  *                   example: 10
//  *                 totalPages:
//  *                   type: integer
//  *                   example: 1
//  *                 totalResults:
//  *                   type: integer
//  *                   example: 1
//  *       "401":
//  *         $ref: '#/components/responses/Unauthorized'
//  *       "403":
//  *         $ref: '#/components/responses/Forbidden'
//  */

// /**
//  * @swagger
//  * /users/{id}:
//  *   get:
//  *     summary: Get a user
//  *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: User id
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *                $ref: '#/components/schemas/User'
//  *       "401":
//  *         $ref: '#/components/responses/Unauthorized'
//  *       "403":
//  *         $ref: '#/components/responses/Forbidden'
//  *       "404":
//  *         $ref: '#/components/responses/NotFound'
//  *
//  *   patch:
//  *     summary: Update a user
//  *     description: Logged in users can only update their own information. Only admins can update other users.
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: User id
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *                 format: email
//  *                 description: must be unique
//  *               password:
//  *                 type: string
//  *                 format: password
//  *                 minLength: 8
//  *                 description: At least one number and one letter
//  *             example:
//  *               name: fake name
//  *               email: fake@example.com
//  *               password: password1
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *                $ref: '#/components/schemas/User'
//  *       "400":
//  *         $ref: '#/components/responses/DuplicateEmail'
//  *       "401":
//  *         $ref: '#/components/responses/Unauthorized'
//  *       "403":
//  *         $ref: '#/components/responses/Forbidden'
//  *       "404":
//  *         $ref: '#/components/responses/NotFound'
//  *
//  *   delete:
//  *     summary: Delete a user
//  *     description: Logged in users can delete only themselves. Only admins can delete other users.
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: User id
//  *     responses:
//  *       "200":
//  *         description: No content
//  *       "401":
//  *         $ref: '#/components/responses/Unauthorized'
//  *       "403":
//  *         $ref: '#/components/responses/Forbidden'
//  *       "404":
//  *         $ref: '#/components/responses/NotFound'
//  */
