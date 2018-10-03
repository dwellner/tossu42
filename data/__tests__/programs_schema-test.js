import Joi from "joi";

const typeSchema = Joi.string()
  .required()
  .valid("pi", "r", "pa", "t", "k", "m", "iv", "lepo", "pe", "ve");
const daySchema = Joi.object().keys({
  type: typeSchema,
  distance: Joi.when("type", {
    is: "lepo",
    then: Joi.forbidden(),
    otherwise: Joi.number()
      .min(0)
      .max(100)
      .required()
  }),
  repeat: Joi.when("type", {
    is: "iv",
    then: Joi.number()
      .integer()
      .min(1)
      .max(20)
      .required(),
    otherwise: Joi.forbidden()
  })
});

const weekSchema = Joi.array()
  .items(daySchema)
  .min(7)
  .max(7);

const stretchRuleSchema = Joi.object().keys({
  minWeeks: Joi.number()
    .integer()
    .min(0)
    .max(52)
    .required(),
  maxWeeks: Joi.number()
    .integer()
    .min(0)
    .max(52)
    .required(),
  repeat: Joi.number()
    .integer()
    .min(0)
    .max(52)
    .required()
});

const programSchema = Joi.object().keys({
  id: Joi.string()
    .min(4)
    .required(),
  name: Joi.string()
    .min(4)
    .required(),
  targetTime: Joi.number()
    .integer()
    .min(120)
    .max(300),
  stretchRules: stretchRuleSchema.optional(),
  weeks: Joi.array()
    .items(weekSchema)
    .min(2)
    .required()
});

describe("Program schema should be valid for", () => {
  it("3:30 programs", () => {
    const programs = require("../programs_330.json");
    programs.forEach(p => Joi.assert(p, programSchema));
  });

  it("4:00 programs", () => {
    const programs = require("../programs_400.json");
    programs.forEach(p => Joi.assert(p, programSchema));
  });
});
