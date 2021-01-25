const express = require('express');

const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');


'use strict';
                                           
router.post('/create/:userId', auth.verify, postCtrl.create);  
router.get('/readAll/:userId', auth.verify, postCtrl.readAll);
router.get('/readSignaled/:userId/:isAdmin', auth.verifyAdmin, postCtrl.readSignaled);
router.get('/readOne/:id/:userId', auth.verify, postCtrl.readOne);
router.put('/update/:id/:userId', auth.verify, postCtrl.update);
router.delete('/delete/:id/:userId', auth.verify, postCtrl.delete);
router.put('/signal/:id/:action/:userId', auth.verify, postCtrl.signal);



module.exports = router;