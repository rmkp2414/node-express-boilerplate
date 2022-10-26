const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const stdmethodcodeValidation = require('../../validations/stdmethodcode.validation');
const stdmethodcodeController = require('../../controllers/stdmethodcode.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageStdMethodCodes'), validate(stdmethodcodeValidation.createStdMethodCode), stdmethodcodeController.createStdMethodCode)
  .get(auth('getStdMethodCodes'), validate(stdmethodcodeValidation.getStdMethodCodes), stdmethodcodeController.getStdMethodCodes);

router
  .route('/:stdmethodcodeId')
  .get(auth('getStdMethodCodes'), validate(stdmethodcodeValidation.getStdMethodCode), stdmethodcodeController.getStdMethodCode)
  .patch(auth('manageStdMethodCodes'), validate(stdmethodcodeValidation.updateStdMethodCode), stdmethodcodeController.updateStdMethodCode)
  .delete(auth('manageStdMethodCodes'), validate(stdmethodcodeValidation.deleteStdMethodCode), stdmethodcodeController.deleteStdMethodCode);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: StdMethodCodes
 *   description: StdMethodCode management and retrieval
 */

/**
 * @swagger
 * /stdmethodcodes:
 *   post:
 *     summary: Create a stdmethodcode
 *     description: Only admins can create other stdmethodcodes.
 *     tags: [StdMethodCodes]
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
 *                  enum: [stdmethodcode, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: stdmethodcode
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/StdMethodCode'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all stdmethodcodes
 *     description: Only admins can retrieve all stdmethodcodes.
 *     tags: [StdMethodCodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: StdMethodCode name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: StdMethodCode role
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
 *         description: Maximum number of stdmethodcodes
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
 *                     $ref: '#/components/schemas/StdMethodCode'
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
 * /stdmethodcodes/{id}:
 *   get:
 *     summary: Get a stdmethodcode
 *     description: Logged in stdmethodcodes can fetch only their own stdmethodcode information. Only admins can fetch other stdmethodcodes.
 *     tags: [StdMethodCodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: StdMethodCode id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/StdMethodCode'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a stdmethodcode
 *     description: Logged in stdmethodcodes can only update their own information. Only admins can update other stdmethodcodes.
 *     tags: [StdMethodCodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: StdMethodCode id
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
 *                $ref: '#/components/schemas/StdMethodCode'
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
 *     summary: Delete a stdmethodcode
 *     description: Logged in stdmethodcodes can delete only themselves. Only admins can delete other stdmethodcodes.
 *     tags: [StdMethodCodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: StdMethodCode id
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
