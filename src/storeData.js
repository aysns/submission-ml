const admin = require('firebase-admin');

if(!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.PROJECT_ID
    });
}
const db = admin.firestore();

async function saveResult(id, result, suggestion, createdAt) {
    try {
        await db.collection(process.env.FIRESTORE_COLLECTION).doc(id).set({
            id,
            result,
            suggestion,
            createdAt
        });
        console.log('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

module.exports = saveResult;