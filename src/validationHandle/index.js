export const createUserConfig = {
    name: {
        required: true,
        in: "body",
    },
    email: {
        required: true,
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        in: "body",
    },
};

const validate = (configuration = {}) => (req, res, next) => {
    const fieldList = Object.keys(configuration);

    let error = []

    fieldList.map((field) => {
        const value = req[configuration[field].in][field]
        const config = configuration[field];
        if (!(config.required && value)) {
            error.push({
                location: configuration[field].in,
                message: `${field} is required`
            })
        }
        if (config.regex && !config.regex.test(value)) {
            error.push({
                location: configuration[field].in,
                message: `Invalid ${field}`
            })
        }
    });

    if (error.length) {
        return res.status(400).send({
            status: 400,
            timestamp: new Date,
            error: error,
        });
    }
    next();
}

export default validate;
