const {Country, Activity} = require('../db');

const postActivity = async (activity) => {

    try {
        const {name, difficulty, duration, season, countries} = activity;
        if (!name || !difficulty || !duration || !season || !countries.length){
            throw new Error('Faltan datos');
        }
        const act = {
            name: name[ 0 ].toUpperCase() + name.slice(1).toLowerCase(),
            difficulty: difficulty,
            duration: duration,
            season: season
        }

        const activityAdd = await Activity.create(act);

        countries.forEach(async element => { 
            const country = await Country.findByPk(element.toUpperCase())
            if (country){
                await country.addActivity(activityAdd);
            }
            
        });

        return activityAdd
    } catch (error) {
        return {error: error.message};
    }
}

module.exports = postActivity; 