const { Activity } = require("../db");

const getActivities = async () => {
  try {
    const activities = await Activity.findAll();
    if (activities.length){
        return activities;
    }
    throw new Error("No hay actividades");
    
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = getActivities;
