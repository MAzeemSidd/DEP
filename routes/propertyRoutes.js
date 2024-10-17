const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const authenticate = require('../middleware/authenticate');  // Assuming you have JWT middleware

router.get('/properties', authenticate, propertyController.getProperties);
router.post('/properties', authenticate, propertyController.createProperty);
router.put('/properties/:id', authenticate, propertyController.updateProperty);
router.delete('/properties/:id', authenticate, propertyController.deleteProperty);

module.exports = router;
