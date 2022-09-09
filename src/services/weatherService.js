import axios from "axios";
import request from "request"
import {cityValidation} from '../common/cityvalidation.js'
import  {postBodyValidation}  from '../common/postBodyValidation.js'
import 'dotenv/config'

//To get weather data
 const getWeather = async(requestParams) => {
    try {
        await cityValidation.validateAsync(requestParams);
        const result = await weatherAPI(requestParams.city);
        return {data: result, code: 200}
      } catch (error) {
        return {data: error, code:400}
    }
}

//To send SMS to mobile Number
const sendSms = async(requestParams) => {
    try {
        await postBodyValidation.validateAsync(requestParams)
        const message = `Weather status: cityName ${requestParams.city} recorded with a temperature of ${requestParams.temperature} F`
        const smsInfo = {
            body: message,
            to: requestParams.mobileNumber,
            from: "AMD",
          };  
          const smsToken =  await formHeaders();
          const headers = {
            authorization: `Bearer ${smsToken}`,
            "content-type": "application/json",
          };
      
          const { data } = await axios.post(
            "https://connect.routee.net/sms",
            smsInfo,
            { headers }
          );
          return {data: data, code: 200}

    } catch (error) {
        if (error.isAxiosError && error.response) {
            if(error.response.data.developerMessage === "Validation Error!") {
              return { data: `Please add a valid mobile number`, code:400};
            } else {
              return { data: `Insufficient Balance to send SMS`, code: 400};
            }
            
          } else {
            return {data: error.message, code:400}
          }
    }
}

//Function to hadle asynchronous weather api call
const weatherAPI = async(city) => {
   return new Promise((resolve, reject) => {
        request ({ 
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.apiKey}`, 
            json: true
            },(error,response,body)=> {
             if(!error && response.statusCode === 200) { 
                 resolve({ Temp: {temperature: body.main.temp, city: body.name, body: body} });
            } else if(response.statusCode === 404) {
                resolve(response.body)
            } else {
                 reject('unable to fetch weather'); 
            } 
            });
    })
}

//funciton to generate accessToken
const formHeaders = async () => {
    try {

      const { data } = await axios.post(
        "https://auth.routee.net/oauth/token",
        new URLSearchParams({ grant_type: "client_credentials" }),
        { auth: { 
            username: process.env.applicationId, 
            password: process.env.smsAuthkey

        } }
      );
      return data.access_token;
    } catch (error) {
      throw Error("Unable to get access Token");
    }
  };

export default {getWeather: getWeather,
                sendSms: sendSms};


