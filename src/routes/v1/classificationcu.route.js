const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const classificationcuValidation = require('../../validations/classificationcu.validation');
const classificationcuController = require('../../controllers/classificationcu.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageClassificationCUs'), validate(classificationcuValidation.createClassificationCU), classificationcuController.createClassificationCU)
  .get(auth('getClassificationCUs'), validate(classificationcuValidation.getClassificationCUs), classificationcuController.getClassificationCUs);

router
  .route('/:classificationcuId')
  .get(auth('getClassificationCUs'), validate(classificationcuValidation.getClassificationCU), classificationcuController.getClassificationCU)
  .patch(auth('manageClassificationCUs'), validate(classificationcuValidation.updateClassificationCU), classificationcuController.updateClassificationCU)
  .delete(auth('manageClassificationCUs'), validate(classificationcuValidation.deleteClassificationCU), classificationcuController.deleteClassificationCU);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ClassificationCUs
 *   description: ClassificationCU management and retrieval
 */

/**
 * @swagger
 * /classificationcus:
 *   post:
 *     summary: Create a classificationcu
 *     description: Only admins can create other classificationcus.
 *     tags: [ClassificationCUs]
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
 *                  enum: [classificationcu, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: classificationcu
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ClassificationCU'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all classificationcus
 *     description: Only admins can retrieve all classificationcus.
 *     tags: [ClassificationCUs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: ClassificationCU name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: ClassificationCU role
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
 *         description: Maximum number of classificationcus
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
 *                     $ref: '#/components/schemas/ClassificationCU'
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
 * /classificationcus/{id}:
 *   get:
 *     summary: Get a classificationcu
 *     description: Logged in classificationcus can fetch only their own classificationcu information. Only admins can fetch other classificationcus.
 *     tags: [ClassificationCUs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ClassificationCU id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ClassificationCU'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a classificationcu
 *     description: Logged in classificationcus can only update their own information. Only admins can update other classificationcus.
 *     tags: [ClassificationCUs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ClassificationCU id
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
 *                $ref: '#/components/schemas/ClassificationCU'
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
 *     summary: Delete a classificationcu
 *     description: Logged in classificationcus can delete only themselves. Only admins can delete other classificationcus.
 *     tags: [ClassificationCUs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ClassificationCU id
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
