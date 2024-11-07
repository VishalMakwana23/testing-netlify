import axios from "axios";
import { Config } from "./Config";

const AxiosMsg = axios.create({
  baseURL: `${Config.API_HOST_MSG}`,
});

export default AxiosMsg;
