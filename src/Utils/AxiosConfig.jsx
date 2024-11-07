import axios from "axios";
import { Config } from "./Config";

const Axios = axios.create({
  baseURL: `${Config.API_HOST_URL_live}`,
});

export default Axios;
