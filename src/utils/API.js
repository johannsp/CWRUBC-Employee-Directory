import axios from "axios";

// Export an object containing random user method(s)

export default {
  getRandomUsers: function() {
    return axios.get("https://randomuser.me/api/?results=200&nat=us");
  }
};
