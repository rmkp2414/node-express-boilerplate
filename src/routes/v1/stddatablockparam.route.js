const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const stddatablockparamValidation = require('../../validations/stddatablockparam.validation');
const stddatablockparamController = require('../../controllers/stddatablockparam.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageStdDataBlockParams'), validate(stddatablockparamValidation.createStdDataBlockParam), stddatablockparamController.createStdDataBlockParam)
  .get(auth('getStdDataBlockParams'), validate(stddatablockparamValidation.getStdDataBlockParams), stddatablockparamController.getStdDataBlockParams);

router
  .route('/:stddatablockparamId')
  .get(auth('getStdDataBlockParams'), validate(stddatablockparamValidation.getStdDataBlockParam), stddatablockparamController.getStdDataBlockParam)
  .patch(auth('manageStdDataBlockParams'), validate(stddatablockparamValidation.updateStdDataBlockParam), stddatablockparamController.updateStdDataBlockParam)
  .delete(auth('manageStdDataBlockParams'), validate(stddatablockparamValidation.deleteStdDataBlockParam), stddatablockparamController.deleteStdDataBlockParam);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: StdDataBlockParams
 *   description: StdDataBlockParam management and retrieval
 */

/**
 * @swagger
 * /stddatablockparams:
 *   post:
 *     summary: Create a stddatablockparam
 *     description: Only admins can create other stddatablockparams.
 *     tags: [StdDataBlockParams]
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
 *                  enum: [stddatablockparam, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: stddatablockparam
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/StdDataBlockParam'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all stddatablockparams
 *     description: Only admins can retrieve all stddatablockparams.
 *     tags: [StdDataBlockParams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: StdDataBlockParam name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: StdDataBlockParam role
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
 *         description: Maximum number of stddatablockparams
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
 *                     $ref: '#/components/schemas/StdDataBlockParam'
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
 * /stddatablockparams/{id}:
 *   get:
 *     summary: Get a stddatablockparam
 *     description: Logged in stddatablockparams can fetch only their own stddatablockparam information. Only admins can fetch other stddatablockparams.
 *     tags: [StdDataBlockParams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: StdDataBlockParam id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/StdDataBlockParam'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a stddatablockparam
 *     description: Logged in stddatablockparams can only update their own information. Only admins can update other stddatablockparams.
 *     tags: [StdDataBlockParams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: StdDataBlockParam id
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
 *                $ref: '#/components/schemas/StdDataBlockParam'
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
 *     summary: Delete a stddatablockparam
 *     description: Logged in stddatablockparams can delete only themselves. Only admins can delete other stddatablockparams.
 *     tags: [StdDataBlockParams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: StdDataBlockParam id
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
