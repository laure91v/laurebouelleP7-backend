const jwt = require ('jsonwebtoken');
'use strict';

exports.verify = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];               
        const decodedToken = jwt.verify(token, process.env.JWT_TOKENSECRET);         
        const userId = decodedToken.userId;                                 
        if(req.params.userId != userId){                   
            throw 'user ID non valable';                                    
        }   else {
            next();                                                         
        }       
        
    
    } catch (error) {
        return res.status(401).json({ error: error | 'requete non authentifiée'})  
    }

};

exports.verifyAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ') [1];              
        const decodedToken = jwt.verify(token, process.env.JWT_TOKENSECRET);        
        const userId = decodedToken.userId;                                 
        if(req.params.userId != userId || req.params.isAdmin != "true"){ 
                                                                                            
            return res.status(401).json({ error: {
                message: "il vous manque les droits administrateurs"
            } | 'requete non authentifiée'});                                    
        }   else {
            next();                                                         
        }                 
    
    }catch (error) {
        
     return res.status(405).json({ error: error | 'requete non authentifiée'})  
        }

};



