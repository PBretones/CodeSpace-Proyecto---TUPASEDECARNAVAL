exports.signUpValidation = (req, res, next) => {
  req.check("username", "Nombre de usuario requerido").notEmpty();
  req
    .check("email", "El Email debe cumplir los requisitos")
    .matches(/.+\@.+\..+/)
    .withMessage("Introduzca un email válido, por favor")
    .isLength({
      min: 5,
      max: 32,
    });

  req.check("password", "Se requiere una contraseña").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener mínimo 6 caracteres y contener un número")
    .matches(/\d/)
    .withMessage("La contraseña debe contener un número");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
