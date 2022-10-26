const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const consistancytypeValidation = require('../../validations/consistancytype.validation');
const consistancytypeController = require('../../controllers/consistancytype.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageConsistancyTypes'), validate(consistancytypeValidation.createConsistancyType), consistancytypeController.createConsistancyType)
  .get(auth('getConsistancyTypes'), validate(consistancytypeValidation.getConsistancyTypes), consistancytypeController.getConsistancyTypes);

router
  .route('/:consistancytypeId')
  .get(auth('getConsistancyTypes'), validate(consistancytypeValidation.getConsistancyType), consistancytypeController.getConsistancyType)
  .patch(auth('manageConsistancyTypes'), validate(consistancytypeValidation.updateConsistancyType), consistancytypeController.updateConsistancyType)
  .delete(auth('manageConsistancyTypes'), validate(consistancytypeValidation.deleteConsistancyType), consistancytypeController.deleteConsistancyType);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ConsistancyTypes
 *   description: ConsistancyType management and retrieval
 */

/**
 * @swagger
 * /consistancytypes:
 *   post:
 *     summary: Create a consistancytype
 *     description: Only admins can create other consistancytypes.
 *     tags: [ConsistancyTypes]
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
 *                  enum: [consistancytype, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: consistancytype
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ConsistancyType'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all consistancytypes
 *     description: Only admins can retrieve all consistancytypes.
 *     tags: [ConsistancyTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: ConsistancyType name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: ConsistancyType role
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
 *         description: Maximum number of consistancytypes
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
 *                     $ref: '#/components/schemas/ConsistancyType'
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
 * /consistancytypes/{id}:
 *   get:
 *     summary: Get a consistancytype
 *     description: Logged in consistancytypes can fetch only their own consistancytype information. Only admins can fetch other consistancytypes.
 *     tags: [ConsistancyTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ConsistancyType id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ConsistancyType'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a consistancytype
 *     description: Logged in consistancytypes can only update their own information. Only admins can update other consistancytypes.
 *     tags: [ConsistancyTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ConsistancyType id
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
 *                $ref: '#/components/schemas/ConsistancyType'
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
 *     summary: Delete a consistancytype
 *     description: Logged in consistancytypes can delete only themselves. Only admins can delete other consistancytypes.
 *     tags: [ConsistancyTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ConsistancyType id
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
