import { useForm, type SubmitHandler } from 'react-hook-form'

type FormFields = {
    email: string;
    password: string;
}

export const SigninForm = () => {
    const { register } = useForm<FormFields>()

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        console.log(data)
    }

    return (
        <form className="form-sign-in">
            <input {...register('email')} type="text" placeholder="Email" />
            <input {...register('password')} type="text" placeholder="Password" />
        </form>
    )
}

