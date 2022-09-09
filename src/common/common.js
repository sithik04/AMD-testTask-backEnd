import CONSTANT from "./constant.js";
import httpres from "http-status-codes"

//Common function to form the response data
  const response = (
    res,
    data,
    status,
  ) => {
    if(status === CONSTANT.SUCCESS_CODE) {
        res.status(status);
        res.json({
        data: data,
        error: {},
        "info": {
            "status": httpres.getStatusText(status),
            "code": status
        }
        });
   } else if(status == CONSTANT.NOT_FOUND_CODE) {
    res.status(status);
        res.json({
        data: data,
        error: {},
        "info": {
            "status": httpres.getStatusText(status),
            "code": status
        }
        });
   } else {
        res.status(status).json({
          "info": {
            "status": httpres.getStatusText(status),
            "code": status
          },
          error: {
            message:data
          },
          success: false,
        });
      };
    

  };

  export default {response: response}