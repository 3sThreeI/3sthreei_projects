"use client"
import React, { useEffect, useState } from "react"
import style from "../../../app/[locale]/(marketing)/services/audit/audit.module.css"
import { auditSchema } from "@/lib/validation/audit"
type formErrorsProps = {
    company_name?: string[],
    email?: string[],
    url?: string[],
}
export default function FormAudit({ message }: { message: any }) {
    console.log("formAudit.tsx rendered")
    const t = message || null
    const [formValues, SetFormValues] = useState({
        company_name: '',
        email: '',
        url: '',
    })
    const [errors, setErrors] = useState<formErrorsProps>({})
    const [success, setSuccess] = useState(false)
    const [pending, setPending] = useState(false)

    useEffect(() => {
        // Skip if form is empty (initial load)
        if (!formValues.company_name && !formValues.email && !formValues.url) {
            return
        }

        // Validate current form values
        const result = auditSchema.safeParse(formValues)

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
            const data = await resp.json()
            if (!resp.ok) {
                setErrors(data.details || { message: [data.error] } || { message: "Back-end failed" })
            } else {
                setSuccess(true)
                SetFormValues({ company_name: '', email: '', url: '' })
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
                    <h1 className={style.title}>{t.formAudit.headTitle}</h1>
                    <p className={style.subtitle}>{t.formAudit.subTitle}</p>
                </div>

                <form onSubmit={HandleSubmit} aria-label="contact-form-for-building-project" className={style.form}>
                    {/* Company name */}
                    <div className={style.grid}>
                        <div className={style.formGroup}>
                            <label htmlFor="fullname" className={style.label}>{t.formAudit.formInput.labelInput1.L}</label>
                            <input
                                type="text"
                                id="company_name"
                                name="company_name"
                                value={formValues.company_name}
                                onChange={(e) => inputHandleFn(e)}
                                placeholder={t.formAudit.formInput.labelInput1.P}
                                title={t.formAudit.formInput.labelInput1.T}
                                className={style.input}
                                required
                            />
                        {errors?.company_name?.[0] && <p className="text-red-500 text-sm">{errors?.company_name[0]}</p>}
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="email" className={style.label}>{t.formAudit.formInput.labelInput2.L}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formValues.email}
                                onChange={(e) => inputHandleFn(e)}
                                placeholder={t.formAudit.formInput.labelInput2.P}
                                title={t.formAudit.formInput.labelInput2.T}
                                className={style.input}
                                required
                            />
                            {errors?.email?.[0] && <p className="text-red-500 text-sm">{errors?.email[0]}</p>}
                        </div>
                    </div>
                    {/* Website URL */}
                    <div className={style.formGroup}>
                        <label htmlFor="website" className={style.label}>{t.formAudit.formInput.labelInput4.L}</label>
                        <input
                            type="url"
                            id="website"
                            name="url"
                            value={formValues.url}
                            onChange={(e) => inputHandleFn(e)}
                            placeholder={t.formAudit.formInput.labelInput4.P}
                            title={t.formAudit.formInput.labelInput4.T}
                            className={style.input}
                            required
                        />
                        {errors?.url?.[0] && <p className="text-red-500 text-sm">{errors.url[0]}</p>}
                    </div>

                    {/* Project Type */}
                    <div className={style.formGroup}>
                        <label htmlFor="projectType" className={style.label}>{t.formAudit.formSelect.labelSelect1.L}</label>
                        <select
                            id="projectType"
                            name="project_type"
                            value={formValues.project_type}
                            onChange={inputHandleFn}
                            className={style.select}
                            required
                            title={t.formAudit.formSelect.labelSelect1.T}
                        >
                            {/* option of select */}
                            {
                                t?.formAudit?.formSelect?.labelSelect1?.Opt?.map((opt: any, index: number) => (
                                    <option key={index} value={opt.key}>{opt.value}</option>
                                ))
                            }
                        </select>
                        {errors?.project_type?.[0] && <p className="text-red-500 text-sm">{errors?.project_type[0]}</p>}
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
                                <span className={style.btnText}>{t.formAudit.btn}</span>
                                <span className={style.btnIcon}>→</span> </div>
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}