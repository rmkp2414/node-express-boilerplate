const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const stdheaderblockparamValidation = require('../../validations/stdheaderblockparam.validation');
const stdheaderblockparamController = require('../../controllers/stdheaderblockparam.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageStdHeaderBlockParams'), validate(stdheaderblockparamValidation.createStdHeaderBlockParam), stdheaderblockparamController.createStdHeaderBlockParam)
  .get(auth('getStdHeaderBlockParams'), validate(stdheaderblockparamValidation.getStdHeaderBlockParams), stdheaderblockparamController.getStdHeaderBlockParams);

router
  .route('/:stdheaderblockparamId')
  .get(auth('getStdHeaderBlockParams'), validate(stdheaderblockparamValidation.getStdHeaderBlockParam), stdheaderblockparamController.getStdHeaderBlockParam)
  .patch(auth('manageStdHeaderBlockParams'), validate(stdheaderblockparamValidation.updateStdHeaderBlockParam), stdheaderblockparamController.updateStdHeaderBlockParam)
  .delete(auth('manageStdHeaderBlockParams'), validate(stdheaderblockparamValidation.deleteStdHeaderBlockParam), stdheaderblockparamController.deleteStdHeaderBlockParam);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: StdHeaderBlockParams
 *   description: StdHeaderBlockParam management and retrieval
 */

/**
 * @swagger
 * /stdheaderblockparams:
 *   post:
 *     summary: Create a stdheaderblockparam
 *     description: Only admins can create other stdheaderblockparams.
 *     tags: [StdHeaderBlockParams]
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
 *                  enum: [stdheaderblockparam, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: stdheaderblockparam
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/StdHeaderBlockParam'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all stdheaderblockparams
 *     description: Only admins can retrieve all stdheaderblockparams.
 *     tags: [StdHeaderBlockParams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: StdHeaderBlockParam name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: StdHeaderBlockParam role
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
 *         description: Maximum number of stdheaderblockparams
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
 *                     $ref: '#/components/schemas/StdHeaderBlockParam'
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
 * /stdheaderblockparams/{id}:
 *   get:
 *     summary: Get a stdheaderblockparam
 *     description: Logged in stdheaderblockparams can fetch only their own stdheaderblockparam information. Only admins can fetch other stdheaderblockparams.
 *     tags: [StdHeaderBlockParams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: StdHeaderBlockParam id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/StdHeaderBlockParam'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a stdheaderblockparam
 *     description: Logged in stdheaderblockparams can only update their own information. Only admins can update other stdheaderblockparams.
 *     tags: [StdHeaderBlockParams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: StdHeaderBlockParam id
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
 *                $ref: '#/components/schemas/StdHeaderBlockParam'
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
 *     summary: Delete a stdheaderblockparam
 *     description: Logged in stdheaderblockparams can delete only themselves. Only admins can delete other stdheaderblockparams.
 *     tags: [StdHeaderBlockParams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: StdHeaderBlockParam id
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
