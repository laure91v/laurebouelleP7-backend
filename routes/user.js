const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');



'use strict';

router.get('/readOne/:userId', auth.verify, userCtrl.readOne);
router.post('/signup', userCtrl.signup);  
router.post('/login',  userCtrl.login);
router.put('/update/:userId', auth.verify, userCtrl.update);
router.delete('/delete/:userId', auth.verify, userCtrl.delete);
                                                     


module.exports = router;