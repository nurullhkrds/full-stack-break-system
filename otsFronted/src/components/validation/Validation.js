import * as yup from 'yup';


export  const changePasswordValidation=yup.object().shape({
   
    
    oldPassword:yup.string().min(5,"Parolanız en az 5 karakterden oluşabilir.").required("Bu alan zorunludur."),
    password:yup.string().min(5,"Parolanız en az 5 karakterden oluşabilir."),
    passwordConfirm:yup.string().oneOf([yup.ref('password')],'Parolalar uyuşmuyor')
    .required("Parola zorunludur")
})