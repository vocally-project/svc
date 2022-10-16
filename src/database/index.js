import mongoose, { Schema } from "mongoose";

import configuration from "../configuration";

mongoose.connect(configuration.mongoDb);

const UserModel = mongoose.model('User', new Schema({ name: String, email: String }));

export default UserModel;
