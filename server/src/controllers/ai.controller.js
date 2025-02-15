const generateReview = require('../services/ai.service');

module.exports.getReview = async (req, res) => {
    const code = req.body.code;
    console.log(req);
    if(!code){
        res.status(400).send('Code is required');
    }
    const review = await generateReview(code);
    res.send(review);
}