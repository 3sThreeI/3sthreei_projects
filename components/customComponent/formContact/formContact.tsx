"use client"
import React, { useEffect, useState } from "react"
import style from "@/app/[locale]/(marketing)/contact-form/projectContactFom.module.css"
import { contactSchema } from "@/lib/validation/contact"
type formErrorsProps = {
    fullname?: string[],
    email?: string[],
    phoneNumber?: string[],
    message?: string[],
    url?: string[],
    project_type?: string[]
}
export default function FormContactCompt({message}:{message:any}) {
    console.log("formContact.tsx rendered")
    console.log("message ", message)
    const t = message || null
    const [formValues, SetFormValues] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        message: '',
        url: '',
        project_type: ''
    })
    const [errors, setErrors] = useState<formErrorsProps>({})
    const [success, setSuccess] = useState(false)
    const [pending, setPending] = useState(false)

    useEffect(() => {
        // Skip if form is empty (initial load)
        if (!formValues.fullname && !formValues.email && !formValues.message && !formValues.phoneNumber) {
            return
        }

        // Validate current form values
        const result = contactSchema.safeParse(formValues)

        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors)
        } else {
            setErrors({})
        }
    }, [formValues])


    const HandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true)
        setErrors({})
        console.log('🚀 Submitting form...')
        console.log('Form data:', formValues)
        try {
            const resp = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues)
            })
            console.log('📥 Response status:', resp.status)
            console.log('📥 Response headers:', resp.headers)
            const data = await resp.json()
            if (!resp.ok) {
                setErrors(data.details || { message: [data.error] } || { message: "Back-end failed" })
                console.log("failed to submit data: ", data)
                console.log('❌ Full error details:', data)
                console.log('❌ Details object:', data.details)
            } else {
                setSuccess(true)
                SetFormValues({ fullname: '', email: '', message: '', phoneNumber: '', url: '', project_type: '' })
                console.log("successFull message: ", data.message)
            }
        } catch (error) {
            setErrors({ message: ['Network error'] })
            console.log("NETWORK ERROR TRY LATER", error)
        } finally {
            setPending(false)
        }
    }
    const inputHandleFn = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        SetFormValues({ ...formValues, [name]: value })
    }
    return (
        <div className={style.wrapper}>
            <div className={style.card}>
                {/* Header Section */}
                <div className={style.header}>
                    <h1 className={style.title}>{t.formContact.headTitle}</h1>
                    <p className={style.subtitle}>{t.formContact.subTitle}</p>
                </div>

                <form onSubmit={HandleSubmit} aria-label="contact-form-for-building-project" className={style.form}>
                    {/* Full Name */}
                    <div className={style.formGroup}>
                        <label htmlFor="fullname" className={style.label}>{t.formContact.formInput.labelInput1.L}</label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={formValues.fullname}
                            onChange={(e) => inputHandleFn(e)}
                            placeholder={t.formContact.formInput.labelInput1.P}
                            title={t.formContact.formInput.labelInput1.T}
                            className={style.input}
                            required
                        />
                    </div>
                    {errors?.fullname?.[0] && <p className="text-red-500 text-sm">{errors?.fullname[0]}</p>}
                    {/* Email and Phone */}
                    <div className={style.grid}>
                        <div className={style.formGroup}>
                            <label htmlFor="email" className={style.label}>{t.formContact.formInput.labelInput2.L}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formValues.email}
                                onChange={(e) => inputHandleFn(e)}
                                placeholder={t.formContact.formInput.labelInput2.P}
                                title={t.formContact.formInput.labelInput2.T}
                                className={style.input}
                                required
                            />
                            {errors?.email?.[0] && <p className="text-red-500 text-sm">{errors?.email[0]}</p>}
                        </div>
                        {/* Phone number input */}
                        <div className={style.formGroup}>
                            <label htmlFor="phoneNumber" className={style.label}>{t.formContact.formInput.labelInput3.L}</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formValues.phoneNumber}
                                onChange={(e) => inputHandleFn(e)}
                                placeholder={t.formContact.formInput.labelInput3.P}
                                title={t.formContact.formInput.labelInput3.T}
                                className={style.input}
                                required
                            />
                            {errors?.phoneNumber?.[0] && <p className="text-red-500 text-sm">{errors?.phoneNumber[0]}</p>}
                        </div>
                    </div>

                    {/* Website URL */}
                    <div className={style.formGroup}>
                        <label htmlFor="website" className={style.label}>{t.formContact.formInput.labelInput4.L}<span className={style.optional}>(Optional)</span></label>
                        <input
                            type="url"
                            id="website"
                            name="url"
                            value={formValues.url}
                            onChange={(e) => inputHandleFn(e)}
                            placeholder={t.formContact.formInput.labelInput4.P}
                            title={t.formContact.formInput.labelInput4.T}
                            className={style.input}
                        />
                        {errors?.url?.[0] && <p className="text-red-500 text-sm">{errors.url[0]}</p>}
                    </div>

                    {/* Project Type */}
                    <div className={style.formGroup}>
                        <label htmlFor="projectType" className={style.label}>{t.formContact.formSelect.labelSelect1.L}</label>
                        <select
                            id="projectType"
                            name="project_type"
                            value={formValues.project_type}
                            onChange={inputHandleFn}
                            className={style.select}
                            required
                            title={t.formContact.formSelect.labelSelect1.T}
                        >
                            {/* option of select */}
                            {
                                t?.formContact?.formSelect?.labelSelect1?.Opt?.map((opt:any, index:number)=> (
                                    <option key={index} value={opt.key}>{opt.value}</option>
                                ))
                            }
                        </select>
                        {errors?.project_type?.[0] && <p className="text-red-500 text-sm">{errors?.project_type[0]}</p>}
                    </div>

                    {/* Message */}
                    <div className={style.formGroup}>
                        <label htmlFor="message" className={style.label}>{t.formContact.formTextarea.labelTextarea1.L}</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formValues.message}
                            onChange={inputHandleFn}
                            placeholder={t.formContact.formTextarea.labelTextarea1.P}
                            title={t.formContact.formTextarea.labelTextarea1.T}
                            className={style.textarea}
                            rows={5}
                            required
                        />
                        {errors?.message?.[0] && <p className="text-red-500 text-sm">{errors?.message[0]}</p>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={pending} className={style.submitBtn} aria-label="submit contact form">
                        {pending ?
                            <span className={style.btnText}>
                                <svg className={style.spinner} viewBox="0 0 24 24">
                                    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
                                </svg>
                            </span> :
                            <div>
                                <span className={style.btnText}>{t.formContact.btn}</span>
                                <span className={style.btnIcon}>→</span> </div>
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}