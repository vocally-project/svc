import UserModel from "../database";

export const createUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const alreadyExist = await UserModel.find({ email: req.body.email });
        if (alreadyExist.length) {
            res.send({
                error: 404,
                message: "email already exist"
            })
        } else {
            const user = await UserModel.create({ name, email });
            res.send({
                status: 200,
                message: "successfully created",
                data: user,
            })
        }
    } catch(err) {
        res.send({ 
            error: err.code,
            message: err.message || "Error"
        })
    }
};

export const getAllUser = async (req, res, next) => {
       try {
       const docs = await UserModel.find({})
            if (docs) {
                res.send({
                    status: 200,
                    message: "successfully fetched",
                    data: docs
                })
            } else {
                res.send({ 
                    error: 404,
                    message: err.message || "Error"
                })
            }
        
    } catch(err) {
        res.send({ 
            error: err.code || 404,
            message: err.message || "Error"
        })
    }
};
