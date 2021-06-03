// validation
// const Joi = require("@hapi/joi");

// const schema = {
//   name: Joi.string().min(6).required(),
//   email: Joi.string().min(6).required().email(),
//   password: Joi.string().min(6).required(),
// };

// const Joi = require("joi");

// const schema = Joi.object({
//   name: Joi.string().alphanum().min(3).max(30).required(),

//   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ["com", "net"] },
//   }),
// });

// const { error } = Joi.ValidationError(req.body.email, schema);
// if (error) return res.send(400).send(error.details[0].message);

// const { validation } = schema.validate({ email: req.body.email });
// if (validation) return res.send(400);
