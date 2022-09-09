import weatherService from "../services/weatherService.js";
import common from "../common/common.js"

 const getWeather = async (req, res) => {
   const resp = await weatherService.getWeather(req.query);
   common.response(res, resp.data, resp.code)
}

export default {getWeather: getWeather};


