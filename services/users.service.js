/* 
    @Author: Chisimdi Damian Ezeanieto
    @Date: 30/10/2018
*/
const express = require('express');
const router = express.Router();

/* 
    @Route: GET /api/users
    @Desc: Get all users route.
    @Access: Public 
*/
router.get('/', (req, res) => {
    res.json({
        status: 200,
        msg: 'Good to go',
        data: []
    });
});

module.exports = router;