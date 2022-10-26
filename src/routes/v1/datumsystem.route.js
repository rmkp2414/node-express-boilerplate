const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const datumsystemValidation = require('../../validations/datumsystem.validation');
const datumsystemController = require('../../controllers/datumsystem.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageDatumSystems'), validate(datumsystemValidation.createDatumSystem), datumsystemController.createDatumSystem)
  .get(auth('getDatumSystems'), validate(datumsystemValidation.getDatumSystems), datumsystemController.getDatumSystems);

router
  .route('/:datumsystemId')
  .get(auth('getDatumSystems'), validate(datumsystemValidation.getDatumSystem), datumsystemController.getDatumSystem)
  .patch(auth('manageDatumSystems'), validate(datumsystemValidation.updateDatumSystem), datumsystemController.updateDatumSystem)
  .delete(auth('manageDatumSystems'), validate(datumsystemValidation.deleteDatumSystem), datumsystemController.deleteDatumSystem);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: DatumSystems
 *   description: DatumSystem management and retrieval
 */

/**
 * @swagger
 * /datumsystems:
 *   post:
 *     summary: Create a datumsystem
 *     description: Only admins can create other datumsystems.
 *     tags: [DatumSystems]
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
 *                  enum: [datumsystem, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: datumsystem
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/DatumSystem'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all datumsystems
 *     description: Only admins can retrieve all datumsystems.
 *     tags: [DatumSystems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: DatumSystem name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: DatumSystem role
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
 *         description: Maximum number of datumsystems
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
 *                     $ref: '#/components/schemas/DatumSystem'
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
 * /datumsystems/{id}:
 *   get:
 *     summary: Get a datumsystem
 *     description: Logged in datumsystems can fetch only their own datumsystem information. Only admins can fetch other datumsystems.
 *     tags: [DatumSystems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: DatumSystem id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/DatumSystem'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a datumsystem
 *     description: Logged in datumsystems can only update their own information. Only admins can update other datumsystems.
 *     tags: [DatumSystems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: DatumSystem id
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
 *                $ref: '#/components/schemas/DatumSystem'
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
 *     summary: Delete a datumsystem
 *     description: Logged in datumsystems can delete only themselves. Only admins can delete other datumsystems.
 *     tags: [DatumSystems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: DatumSystem id
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
