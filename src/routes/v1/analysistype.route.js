const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const analysistypeValidation = require('../../validations/analysistype.validation');
const analysistypeController = require('../../controllers/analysistype.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageAnalysisTypes'), validate(analysistypeValidation.createAnalysisType), analysistypeController.createAnalysisType)
  .get(auth('getAnalysisTypes'), validate(analysistypeValidation.getAnalysisTypes), analysistypeController.getAnalysisTypes);

router
  .route('/:analysistypeId')
  .get(auth('getAnalysisTypes'), validate(analysistypeValidation.getAnalysisType), analysistypeController.getAnalysisType)
  .patch(auth('manageAnalysisTypes'), validate(analysistypeValidation.updateAnalysisType), analysistypeController.updateAnalysisType)
  .delete(auth('manageAnalysisTypes'), validate(analysistypeValidation.deleteAnalysisType), analysistypeController.deleteAnalysisType);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: AnalysisTypes
 *   description: AnalysisType management and retrieval
 */

/**
 * @swagger
 * /analysistypes:
 *   post:
 *     summary: Create a analysistype
 *     description: Only admins can create other analysistypes.
 *     tags: [AnalysisTypes]
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
 *                  enum: [analysistype, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: analysistype
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/AnalysisType'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all analysistypes
 *     description: Only admins can retrieve all analysistypes.
 *     tags: [AnalysisTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: AnalysisType name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: AnalysisType role
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
 *         description: Maximum number of analysistypes
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
 *                     $ref: '#/components/schemas/AnalysisType'
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
 * /analysistypes/{id}:
 *   get:
 *     summary: Get a analysistype
 *     description: Logged in analysistypes can fetch only their own analysistype information. Only admins can fetch other analysistypes.
 *     tags: [AnalysisTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: AnalysisType id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/AnalysisType'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a analysistype
 *     description: Logged in analysistypes can only update their own information. Only admins can update other analysistypes.
 *     tags: [AnalysisTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: AnalysisType id
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
 *                $ref: '#/components/schemas/AnalysisType'
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
 *     summary: Delete a analysistype
 *     description: Logged in analysistypes can delete only themselves. Only admins can delete other analysistypes.
 *     tags: [AnalysisTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: AnalysisType id
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
