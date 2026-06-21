"use client"
import toast, { Toaster } from 'react-hot-toast';
import style from "@/app/[locale]/(auth)/auth/sign-in/sign.module.css"
import React, { useEffect, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { success } from "zod"
interface formProps {
    firstname?: string,
    lastname?: string,
    email?: string,
    password?: string,
    confirm_password?:string,
    role?: string
}
export default function SignUpComp(messages: any) {
    const [success, setSuccess] = useState<null | boolean>(null)
    const [error, setError] = useState<null | string>("null")
    const [pending, setPending] = useState(false)
    const [formValues, setFormValue] = useState<formProps>({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        confirm_password: ""
    })
    const [pwdType, setpwdType] = useState('password')
    if (!messages) return null
    const t = messages?.messages
    //  function 
    const HandleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true)
        try {
            const resp = await fetch(`/api/auth/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formValues),
                credentials: "include"
            })
            const data = await resp.json()
            if (!resp.ok) {
                setSuccess(false)
                console.log('❌ Full error details:', data.errors)
                setError(data.errors)
                toast.error(error, {
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                    },
                    iconTheme: {
                        primary: '#713200',
                        secondary: '#FFFAEE',
                    },
                });
                return
            }
            console.log("data", data)
            setSuccess(true)
            return toast.success(data.message, {
                style: {
                    border: '1px solid green',
                    padding: '16px',
                    color: 'green',
                },
                iconTheme: {
                    primary: 'green',
                    secondary: 'white',
                },
            })
        } catch (err) {
            console.log("NETWORK ERROR TRY LATER", err)
            toast.error(error, {
                style: {
                    border: '1px solid red',
                    padding: '7px',
                    color: '#713200',
                    fontFamily: "16px",
                    borderRadius: "50px",

                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
        } finally {
            setPending(false)
        }
    }
    const inputChange = (e: any) => {
        const { name, value } = e.target
        setFormValue((prev) => {
            return { ...prev, [name]: value }
        })
    }
    return (
        <>
            <div className={style.formContainer}>
                <div><Toaster position="top-right" /></div>
                <form action="" className={style.form} onSubmit={HandleSubmit}>
                    <h1 className={style.title}>{t.title2}</h1>
                    <div className={style.formGroup}>
                        <div className={style.row}>
                            <label className={style.label} htmlFor="firstname">{t.firstname.label}</label>
                            <input className={style.input}
                                type="text"
                                title={t.firstname?.inputTitle}
                                value={formValues.firstname}
                                name="firstname"
                                placeholder={t.firstname?.placeholder}
                                id="firstname"
                                onChange={inputChange}
                                required />
                        </div>
                        <div className={style.row}>
                            <label className={style.label} htmlFor="firstname">{t.lastname.label}</label>
                            <input className={style.input}
                                type="text"
                                title={t.lastname?.inputTitle}
                                value={formValues.lastname}
                                name="lastname"
                                placeholder={t.lastname?.placeholder}
                                id="lastname"
                                onChange={inputChange}
                                required />
                        </div>
                        <div className={style.row}>
                            <label className={style.label} htmlFor="email" >{t.email?.label}</label>
                            <input className={style.input}
                                type="email"
                                title={t.email?.inputTitle}
                                value={formValues.email}
                                name="email"
                                placeholder={t.email?.placeholder}
                                id="email"
                                onChange={inputChange}
                                required />
                        </div>
                        <div className={style.row}>
                            <label className={style.label} htmlFor="password" >{t.pwd?.label}</label>
                            <div className={style.password}>
                                <input className={style.inputpwd}
                                    type={pwdType}
                                    title={t.pwd?.inputTitle}
                                    name="password"
                                    value={formValues.password}
                                    placeholder={t.pwd?.placeholder}
                                    id="password"
                                    onChange={inputChange}
                                    required />
                                {pwdType === "text" && <FaEye className={style.show} onClick={() => setpwdType('password')} />}
                                {pwdType === "password" && <FaEyeSlash className={style.show} onClick={() => setpwdType('text')} />}
                            </div>
                        </div>
                        <div className={style.row}>
                            <label className={style.label} htmlFor="password" >{t.confirm_pwd?.label}</label>
                            <div className={style.password}>
                                <input className={style.inputpwd}
                                    type={pwdType}
                                    title={t.confirm_pwd?.inputTitle}
                                    name="confirm_password"
                                    value={formValues.confirm_password}
                                    placeholder={t.confirm_pwd?.placeholder}
                                    id="confirm_password"
                                    onChange={inputChange}
                                    required />
                                {pwdType === "text" && <FaEye className={style.show} onClick={() => setpwdType('password')} />}
                                {pwdType === "password" && <FaEyeSlash className={style.show} onClick={() => setpwdType('text')} />}
                            </div>
                        </div>
                        <div className={style.formBtn}>
                            <button type="submit" className={style.btn}>Sign In</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}