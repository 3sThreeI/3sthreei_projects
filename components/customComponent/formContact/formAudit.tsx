"use client"
import React, { useEffect, useState } from "react"
import style from "../../../app/[locale]/(marketing)/services/audit-web-site/audit.module.css"
import { auditSchema } from "@/lib/validation/audit"
import { useSearchParams } from "next/navigation"
type formErrorsProps = {
    company_name?: string[],
    email?: string[],
    url?: string[],
    service_type?: string[],
    message?: string[]
}
export default function FormAudit({ message }: { message: any }) {
    console.log("formAudit.tsx rendered")
    const searchparam = useSearchParams()
    const service_type = searchparam.get('type')
    if (!message) return null;
    const t = message;
    const [formValues, setFormValues] = useState({
        company_name: '',
        email: '',
        url: '',
        service_type: ''
    })
    const [errors, setErrors] = useState<formErrorsProps>({})
    const [success, setSuccess] = useState(false)
    const [pending, setPending] = useState(false)

    // for immediat checking validation
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

    //  function for sending the data to proxy
    const HandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true)
        setErrors({})
        console.log('🚀 Submitting form... values: ', formValues)
        try {
            const resp = await fetch('/api/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues)
            })
            const data = await resp.json()
            if (!resp.ok) {
                setErrors(data.details || { message: [data.error] } || { message: "Back-end failed" })
            } else {
                setSuccess(true)
                setFormValues({ company_name: '', email: '', url: '', service_type: '' })
                console.log("successFull message: ", data.message)
            }
        } catch (error) {
            setErrors({ message: ['Network error'] })
            console.log("NETWORK ERROR TRY LATER", error)
        } finally {
            setPending(false)
        }
    }
    //  function to handle the input change
    const inputHandleFn = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }
    return (
        <div className={style.wrapper}>
            <div className={style.card}>
                {/* Header Section */}
                <div className={style.header}>
                    <h1 className={style.title}>{t?.formAudit?.headTitle}</h1>
                    <p className={style.subtitle}>{t?.formAudit?.subTitle}</p>
                </div>

                <form onSubmit={HandleSubmit} aria-label="contact-form-for-building-project" className={style.form}>
                    {/* Company name */}
                    <div className={style.grid}>
                        <div className={style.formGroup}>
                            <label htmlFor="company_name" className={style.label}>{t.formAudit.formInput.labelInput1.L}</label>
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
                        {/* email */}
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
                            name="service_type"
                            defaultValue={formValues.service_type}
                            className={style.select}
                            disabled
                            title={t.formAudit.formSelect.labelSelect1.T}
                        >
                            {/* option of select */}
                            {
                                t?.formAudit?.formSelect?.labelSelect1?.Opt?.map((opt: any, index: number) => (
                                    <option key={index} value={opt.key}>{opt.value}</option>
                                ))
                            }
                        </select>
                        {errors?.service_type?.[0] && <p className="text-red-500 text-sm">{errors?.service_type[0]}</p>}
                    </div>
                    {/* Submit Button */}
                    <button type="submit" disabled={pending} className={style.submitBtn} aria-label="submit contact form">
                        {pending ?
                            <span className={style.btnText}>
                                <svg className={style.spinner} viewBox="0 0 24 24" width={24} height={24}>
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </span> :
                            <div>
                                <span className={style.btnText}>{t.formAudit.btn}</span>
                                <span className={style.btnIcon}>→</span></div>
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}