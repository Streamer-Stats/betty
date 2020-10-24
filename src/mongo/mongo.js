const MongoClient = require('mongodb').MongoClient

class MongoDB {
    constructor(user, password, database, host) {
        this.user = user;
        this.password = password;
        this.database = database;
        this.host = host;
        this.conn;
    }

    connect = ()  => {
        let uri = `mongodb://${this.user}:${this.password}@${this.host}:27017/${this.database}?authSource=admin`;
        MongoClient.connect(uri, (err, client) => {
            if (err) return console.log(err)
            this.conn = client.db(this.database)
        })
    }

    getByUserName = username => ( this.conn.collection('players').findOne({'name': username}) )
    
    insertNewUser = player => ( this.conn.collection('players').insertOne(player, (err, res) => {
        if (err) throw err;
        console.log(`player ${player.name} is added`);
    }))

    
}

module.exports = MongoDB