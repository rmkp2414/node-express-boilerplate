const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const substancetypeValidation = require('../../validations/substancetype.validation');
const substancetypeController = require('../../controllers/substancetype.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageSubstanceTypes'), validate(substancetypeValidation.createSubstanceType), substancetypeController.createSubstanceType)
  .get(auth('getSubstanceTypes'), validate(substancetypeValidation.getSubstanceTypes), substancetypeController.getSubstanceTypes);

router
  .route('/:substancetypeId')
  .get(auth('getSubstanceTypes'), validate(substancetypeValidation.getSubstanceType), substancetypeController.getSubstanceType)
  .patch(auth('manageSubstanceTypes'), validate(substancetypeValidation.updateSubstanceType), substancetypeController.updateSubstanceType)
  .delete(auth('manageSubstanceTypes'), validate(substancetypeValidation.deleteSubstanceType), substancetypeController.deleteSubstanceType);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SubstanceTypes
 *   description: SubstanceType management and retrieval
 */

/**
 * @swagger
 * /substancetypes:
 *   post:
 *     summary: Create a substancetype
 *     description: Only admins can create other substancetypes.
 *     tags: [SubstanceTypes]
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
 *                  enum: [substancetype, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: substancetype
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/SubstanceType'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all substancetypes
 *     description: Only admins can retrieve all substancetypes.
 *     tags: [SubstanceTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: SubstanceType name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: SubstanceType role
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
 *         description: Maximum number of substancetypes
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
 *                     $ref: '#/components/schemas/SubstanceType'
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
 * /substancetypes/{id}:
 *   get:
 *     summary: Get a substancetype
 *     description: Logged in substancetypes can fetch only their own substancetype information. Only admins can fetch other substancetypes.
 *     tags: [SubstanceTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: SubstanceType id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/SubstanceType'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a substancetype
 *     description: Logged in substancetypes can only update their own information. Only admins can update other substancetypes.
 *     tags: [SubstanceTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: SubstanceType id
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
 *                $ref: '#/components/schemas/SubstanceType'
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
 *     summary: Delete a substancetype
 *     description: Logged in substancetypes can delete only themselves. Only admins can delete other substancetypes.
 *     tags: [SubstanceTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: SubstanceType id
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
