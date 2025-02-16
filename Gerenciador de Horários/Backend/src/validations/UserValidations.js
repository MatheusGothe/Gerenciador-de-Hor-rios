// middlewares/validateUser.js
import { body, validationResult } from "express-validator";

export const validateUser = [
  // Validação de nome
  body("nome")
    .trim()
    .notEmpty()
    .withMessage("O nome não pode estar vazio.")
    .isLength({ min: 3 })
    .withMessage("O nome deve ter pelo menos 3 caracteres."),

  // Validação de email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("O email não pode estar vazio.")
    .isEmail()
    .withMessage("O email fornecido não é válido."),

  // Validação de senha
  body("password")
    .trim() // Remove espaços extras no início e no final
    .notEmpty()
    .withMessage("A senha não pode estar vazia.")
    .matches(/^\S*$/)
    .withMessage("A senha não pode conter espaços.") // Garante que não tenha espaços
    .isLength({ min: 6 })
    .withMessage("A senha deve ter pelo menos 6 caracteres."),

  // Validação de confirmação de senha
  body("confirmPassword")
    .notEmpty()
    .withMessage("A confirmação de senha não pode estar vazia.")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("As senhas não coincidem."),
  // Função para verificar se houve erro nas validações
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Caso não haja erros, segue para o próximo middleware
  },
];

export const validateUpdateUser = [
  // Validação de nome
  body("nome")
    .trim()
    .notEmpty()
    .withMessage("O nome não pode estar vazio.")
    .isLength({ min: 3 })
    .withMessage("O nome deve ter pelo menos 3 caracteres."),

  // Validação de email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("O email não pode estar vazio.")
    .isEmail()
    .withMessage("O email fornecido não é válido."),

  // Validação de senha
 /* body("password")
    .trim() // Remove espaços extras no início e no final
    .notEmpty()
    .withMessage("A senha não pode estar vazia.")
    .matches(/^\S*$/)
    .withMessage("A senha não pode conter espaços.") // Garante que não tenha espaços
    .isLength({ min: 6 })
    .withMessage("A senha deve ter pelo menos 6 caracteres."),

  // Validação de confirmação de senha
  body("confirmPassword")
    .notEmpty()
    .withMessage("A confirmação de senha não pode estar vazia.")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("As senhas não coincidem."),*/
  // Função para verificar se houve erro nas validações
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Caso não haja erros, segue para o próximo middleware
  },
];
