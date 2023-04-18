module.exports = function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            res.status(409).json({ error: error.details[0].message });
        } else {
            next();
        }
    };
}
