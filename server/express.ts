import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from "./router/Router";
export default async function server() {
const app = express();
app.use(cors());
app.use(express.json());
const dbUrl = 'mongodb+srv://armankhanikiryan:93285797a@node-vercel-cluster.cpc5cyl.mongodb.net/';
mongoose.connect(dbUrl)
    .then(() => console.log('Successfully connected to mongo'))
    .catch(err => console.log(err));

app.use('/',router)

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
    console.log(`Server is up and working on port ${PORT}`);
});
}
