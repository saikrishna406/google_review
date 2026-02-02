const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../database.json');

// Default empty state
const defaultData = {
    users: [],
    businesses: [],
    customers: [],
    reviewRequests: [],
    ratingEvents: [],
    feedback: [],
    subscriptions: []
};

// Load data or initialize
let data = { ...defaultData };

if (fs.existsSync(DATA_FILE)) {
    try {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
        data = JSON.parse(fileContent);
    } catch (err) {
        console.error('Error reading database file, using default empty data:', err);
    }
} else {
    // Create file if it doesn't exist
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error creating database file:', err);
    }
}

// Helper to save data
data.write = () => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing to database file:', err);
    }
};

module.exports = data;
