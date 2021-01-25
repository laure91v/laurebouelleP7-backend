const express = require('express');

const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');


'use strict';
                                           
router.post('/create/:userId', auth.verify, commentCtrl.create);  
router.get('/readAll/:postId/:userId', auth.verify, commentCtrl.readAll);
router.get('/readSignaled/:userId/:isAdmin', auth.verifyAdmin, commentCtrl.readSignaled);
router.put('/update/:id/:userId', auth.verify, commentCtrl.update);
router.delete('/delete/:id/:userId', auth.verify, commentCtrl.delete);
router.put('/signal/:id/:action/:userId', auth.verify, commentCtrl.signal);



module.exports = router;