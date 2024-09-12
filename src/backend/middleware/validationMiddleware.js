exports.validate = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body, {
            errors: { language: 'ar' } //en or ar
        });
        if (result.error) {
            return res.status(400).json({
                error: result.error.details[0].message,
            });
        }
        if (!req.value) {
            req.value = {};
        }
        req.value['body'] = result.value;
        next();
    };
};