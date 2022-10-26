const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const coordinatesystemValidation = require('../../validations/coordinatesystem.validation');
const coordinatesystemController = require('../../controllers/coordinatesystem.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageCoordinateSystems'), validate(coordinatesystemValidation.createCoordinateSystem), coordinatesystemController.createCoordinateSystem)
  .get(auth('getCoordinateSystems'), validate(coordinatesystemValidation.getCoordinateSystems), coordinatesystemController.getCoordinateSystems);

router
  .route('/:coordinatesystemId')
  .get(auth('getCoordinateSystems'), validate(coordinatesystemValidation.getCoordinateSystem), coordinatesystemController.getCoordinateSystem)
  .patch(auth('manageCoordinateSystems'), validate(coordinatesystemValidation.updateCoordinateSystem), coordinatesystemController.updateCoordinateSystem)
  .delete(auth('manageCoordinateSystems'), validate(coordinatesystemValidation.deleteCoordinateSystem), coordinatesystemController.deleteCoordinateSystem);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: CoordinateSystems
 *   description: CoordinateSystem management and retrieval
 */

/**
 * @swagger
 * /coordinatesystems:
 *   post:
 *     summary: Create a coordinatesystem
 *     description: Only admins can create other coordinatesystems.
 *     tags: [CoordinateSystems]
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
 *                  enum: [coordinatesystem, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: coordinatesystem
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CoordinateSystem'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all coordinatesystems
 *     description: Only admins can retrieve all coordinatesystems.
 *     tags: [CoordinateSystems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: CoordinateSystem name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: CoordinateSystem role
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
 *         description: Maximum number of coordinatesystems
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
 *                     $ref: '#/components/schemas/CoordinateSystem'
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
 * /coordinatesystems/{id}:
 *   get:
 *     summary: Get a coordinatesystem
 *     description: Logged in coordinatesystems can fetch only their own coordinatesystem information. Only admins can fetch other coordinatesystems.
 *     tags: [CoordinateSystems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: CoordinateSystem id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CoordinateSystem'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a coordinatesystem
 *     description: Logged in coordinatesystems can only update their own information. Only admins can update other coordinatesystems.
 *     tags: [CoordinateSystems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: CoordinateSystem id
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
 *                $ref: '#/components/schemas/CoordinateSystem'
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
 *     summary: Delete a coordinatesystem
 *     description: Logged in coordinatesystems can delete only themselves. Only admins can delete other coordinatesystems.
 *     tags: [CoordinateSystems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: CoordinateSystem id
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
