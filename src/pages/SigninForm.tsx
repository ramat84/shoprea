const SALT = "m12oik3SADF!@$$FASofpsaq.1243?"

import axios from "axios"
import { useForm, type SubmitHandler } from "react-hook-form"
import Cookies from "js-cookie"
import { sha256 } from "js-sha256"

import { Header } from '../components/Header'
import { UserContext } from "../contexts/UserContext"

import '../css/pages/signin.css'
import { useContext, useEffect } from "react"

type FormFields = {
    email: string;
    password: string;
}


export const Welcome = () => {
    const [user, setUser] = useContext(UserContext)

    return (
        <div className="popup-signin">
            <h2>Welcome back</h2>
            <h3>{user.email}</h3>
            <div class="user-icon"><i></i></div>
        </div>
    )
}

export const Form = () => {
    const [user, setUser] = useContext(UserContext)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>()


    const onSubmit: SubmitHandler<FormFields> = (data) => {
        axios.post('http://localhost:4000/api/signin', {
            "email": data.email,
            "password": sha256(data.password + SALT)
        })
            .then((res) => {

                console.log(res)

                if (res.data.status == 200) {
                    Cookies.set('session', res.data.session, { expires: 7 })
                    setUser({ session: res.data.session, email: data.email })

                    confirm(res.data.message)
                } else {
                    alert(res.data.message)
                }
            })
    }

    return (
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
    )
}

export const SigninForm = () => {
    const [user, setUser] = useContext(UserContext)

    return (
        <>
            <Header />
            {user ? <Welcome /> : <Form />}
        </>
    )
}
