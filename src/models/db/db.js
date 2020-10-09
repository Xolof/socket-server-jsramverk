const MongoClient = require("mongodb").MongoClient;
const dsn =  "mongodb://localhost:27017/chat";

async function saveMessage(data) {
    const mongo = await new MongoClient(dsn, { useUnifiedTopology: true });
    const client = await mongo.connect();
    const db = await client.db();
    const col = await db.collection("message");

    await col.insertOne(data);

    await client.close();
    console.log("Save done");
}

async function getMessages() {
    const mongo = await new MongoClient(dsn, { useUnifiedTopology: true });
    const client = await mongo.connect();
    const db = await client.db();
    const col = await db.collection("message");

    const res = await col.find().project({ _id: 0 }).toArray();

    await client.close()

    return res;
}

module.exports = {
    saveMessage,
    getMessages
}
