import { useForm, type SubmitHandler } from "react-hook-form"
import axios from "axios"

import { Header } from '../components/Header'
import '../css/pages/signin.css'

type FormFields = {
    email: string;
    password: string;
}

export const SigninForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>()

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        axios.post('/api/singin', {
            "email": data.email,
            "password": data.password
        })
            .then((res) => {
                console.log(res)
                confirm("SUCCESS!")
            })
            .catch(() => {
                alert("I AM ERROR!")
            })
    }

    return <>
        <Header />
        <div className="popup-signin">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    autoComplete="off"
                    type="text"
                    {...register('email', {
                        required: "Email is required",
                        pattern: { value: /^[A-Za-z0-9.]+@[A-Za-z0-9.]+$/, message: "Enter a valid Email address" }
                    })}
                    placeholder="Email"
                />
                {errors.email && (
                    <div className="error">{errors.email.message}</div>
                )}
                <input
                    type="password"
                    autoComplete="off"
                    {...register('password', {
                        required: "Password is required",
                        minLength: { value: 8, message: "Use at least 8 characters" }
                    })}
                    placeholder="Password"
                />
                {errors.password && (
                    <div className="error">{errors.password.message}</div>
                )}
                <button disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Sign in"}
                </button>
            </form>
        </div>
    </>

}

