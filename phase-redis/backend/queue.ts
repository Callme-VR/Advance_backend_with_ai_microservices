import { Queue } from "bullmq";
import { redis } from "./index";


const mailqueue = new Queue("email", { connection: redis })

export default mailqueue;