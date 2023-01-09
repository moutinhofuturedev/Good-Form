import * as yup from "yup";

export const FormCreateSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório."),
  email: yup
    .string()
    .required("E-mail é obrigatório.")
    .email("E-mail inválido."),
  password: yup
    .string()
    .required("Senha é obrigatório.")
    .min(10, "Senha deve conter mínimo de 10 caracteres."),
  profession: yup
    .string()
    .test("profession", "Selecione uma profissão.", (value) => value !== "0"),
  privacyTerms: yup
    .boolean()
    .test(
      "privacyTerms",
      "Você deve concordar com os termos.",
      (value) => value === true
    ),
});