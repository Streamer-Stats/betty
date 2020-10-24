const axios = require('axios')

class LeagueOfLegends {
    constructor(key, baseEndpoint) {
        this.key = key
        this.baseEndpoint = baseEndpoint
    } 

    getPlayer = async (username) => {
        try {
            return await axios.get(`${this.baseEndpoint}/by-name/${username}?api_key=${this.key}`)
        }
        catch (error) {
            console.error(error)
        }

    }
}

module.exports = LeagueOfLegends