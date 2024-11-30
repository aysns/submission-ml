const admin = require('firebase-admin');
require('dotenv').config();

if(!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.PROJECT_ID
    });
}

const db = admin.firestore();

async function history() {
    try {
        const predictionsCollection = db.collection(process.env.FIRESTORE_COLLECTION);
        const snapshot = await predictionsCollection.get();

        if (snapshot.empty) 
            return { messages: 'No data found' }.code(404);
        
        const responseData = [];
        snapshot.forEach(doc => {
            responseData.push({ id: doc.id, ...doc.data() });
        });

        return {
            status: 'success',
            data: responseData
        };
    } catch (error) {
        console.error('Error fetching data: ', error);
        return { 
            status: 'fail',
            error: 'Unable to fetch data' 
        };
    }
}


module.exports = history;
