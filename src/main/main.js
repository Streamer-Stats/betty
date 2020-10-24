const Rabbitmq = require('../rabbitmq/rabbitmq');
const Mongodb =  require('../mongo/mongo');
const LeagueOfLegends = require('../httpRequest/leagueOfLegends')

class Main {
    constructor() {
        this.mongo = new Mongodb("root", 123, "streamStats", "localhost")
        this.rabbitmq = new Rabbitmq("guest", "guest", "localhost")
        this.leagueoflegends = new LeagueOfLegends("RGAPI-465a50b0-23c0-4e92-aa38-7e990e161a7f", "https://br1.api.riotgames.com/lol/summoner/v4/summoners")
     }


    handle = player => {
        let username = player.username
        this.mongo.getByUserName(username)
            .then(res => {
                if(res === null) {
                    this.leagueoflegends.getPlayer(username).then(response => {
                        if (response.status === 200) {
                            let newUser = response.data
                            newUser.name = newUser.name.trim()
                            console.log(newUser)
                            this.mongo.insertNewUser(newUser)
                        } 
                    })
                    .catch(err => {
                        console.log("err,", err)
                    })
                }
                else {
                    console.log(`${username} already added`)
                }
            })
            .catch(err => {
                console.log("err,", err)
            })
    }

    run = () => {
       this.mongo.connect()
       this.rabbitmq.createConnection("newPlayer")
       .then(ch => {
           this.rabbitmq.consume(ch, "newPlayer", this.handle)
       })
       
    }
}

module.exports = Main