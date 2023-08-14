import databaseConnect from "./database/database";
require('dotenv').config();
import express from 'express';
import cors from 'cors';
import router from "./router/Router";
export default async function server() {
const app = express();
app.use(cors());
app.use(express.json());
databaseConnect()

app.use('/',router)

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
    console.log(`Server is up and working on port ${PORT}`);
});
}
