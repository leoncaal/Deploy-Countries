const {Router} = require('express');
const postActivity = require('../controllers/postActivity');
const getActivities = require('../controllers/getActivities')
const router = Router();

router.post("/", async (req, res) => {
    try {
        const activity = await postActivity(req.body)
        if(activity.error){
            throw new Error(activity.error);
        }
        res.status(200).json(activity)
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.get("/", async (req,res) =>{
    try {
        const activities = await getActivities();
        if (activities.error){
            throw new Error(activities.error);
        }
        res.status(200).json(activities);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;
