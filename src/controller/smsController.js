import weatherService from "../services/weatherService.js";
import common from "../common/common.js"

//Api to send SMS
const sendSms = async (req, res) => {
    const resp = await weatherService.sendSms(req.body);
    common.response(res, resp.data, resp.code)
 }

 export default {
    sendSms: sendSms};