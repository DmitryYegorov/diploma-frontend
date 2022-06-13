import * as yup from "yup";

const mediumRegex = new RegExp(
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
);

export const RegisterFormSchema = yup.object().shape({
  email: yup.string().email().required("Email обязательное поле"),
  firstName: yup.string().required("Фамилия - обязательное поле"),
  middleName: yup.string().required("Обязательное поле"),
  lastName: yup.string(),
  password: yup
    .string()
    .matches(mediumRegex, {
      message:
        "Пароль хотя бы одну строчную букву и одну цифру или имеет по крайней мере одну прописную букву и одну цифру",
    })
    .required("Обязательное поле"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
});
