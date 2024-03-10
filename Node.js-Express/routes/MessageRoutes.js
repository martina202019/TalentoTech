const express = require('express');
const router = express.Router();
const messageSchema = require('../models/Message');

router.get('/message', async (req, res) => {
    let messages = await messageSchema.find()
    .populate({
        path : 'from',
        select : '-password'
    })
    .populate({
        path : 'to',
        select : '-password'
    });
    res.json(messages);
})

router.post('/message', async(req, res) => {
    let message = messageSchema({
        body : req.body.body,
        from : req.body.from,
        to : req.body.to,
    });

    user.save().then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send({'Status' : 'Error', 'Message' : error.message});
    })
});

module.exports = router;