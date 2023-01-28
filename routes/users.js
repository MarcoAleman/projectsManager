const express = require('express');
const router = express.Router();

const { profile } = require('../controllers/usersController');

/* /api/users */

router
    .get('/', profile)
    /* .post('/login', login)
    .get('/checked', checked)
    .get('/send-token', sendToken)
    .route('/reset-password')
        .get(verifyToken)
        .post(changePassword) */

module.exports = router;
