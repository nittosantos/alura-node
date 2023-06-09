import mongoose from "mongoose";

mongoose.connect('mongodb+srv://nitto:2414@alura.srlk1ac.mongodb.net/alura-node');

const db = mongoose.connection

export default db