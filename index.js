// import express from 'express';
// import cors from 'cors';
// import mongoose, { Schema } from 'mongoose';
//
// const index = express();
//
// index.use(cors());
// index.use(express.json());
//
// const dbUrl = 'mongodb+srv://armankhanikiryan:93285797a@node-vercel-cluster.cpc5cyl.mongodb.net/';
//
// mongoose.connect(dbUrl)
//     .then(() => console.log('Successfully connected to mongo'))
//     .catch(err => console.log(err));
//
// const userSchema = new Schema({
//     name: String,
//     age: Number,
// });
//
//
// const UserModel= mongoose.model('User', userSchema);
//
// index.get('/', async (req, res) => {
//     try {
//         const users = await UserModel.find();
//         res.status(200).json(users);
//     } catch (e) {
//         res.status(500).json({ message: 'Error in reading database' });
//     }
// });
//
// index.post('/post', async (req, res) => {
//     const { name, age } = req.body;
//     try {
//         const newUser = await UserModel.create({ name, age });
//         res.status(200).json({ message: 'user added', user: newUser });
//     } catch (e) {
//         res.status(500).json({ message: 'Error in writing database' });
//     }
// });
//
// index.delete('/delete/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         await UserModel.deleteOne({ _id: id });
//         res.status(200).json('user deleted');
//     } catch (e) {
//         res.status(500).json({ message: 'Error in deleting user' });
//     }
// });
//
// const PORT = 1234;
//
// index.listen(PORT, () => {
//     console.log(`Server is up and working on port ${PORT}`);
// });

const server = require('./dist/server/express/express').default;

server();

