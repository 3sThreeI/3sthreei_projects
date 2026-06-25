"use client"
import React, { Suspense, useEffect, useState } from "react"
import style from "../../../app/[locale]/(marketing)/services/audit-web-site/audit.module.css"
import { auditSchema } from "@/lib/validation/audit"
import { useSearchParams } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"
type formErrorsProps = {
    company_name?: string[],
    email?: string[],
    website_url?: string[],
    service_type?: string[],
    message?: string[]
}
export default function FormAudit({ message, searchParams }: { message: any, searchParams:string }) {
    console.log("formAudit.tsx rendered")
    const service_type = searchParams
    console.log("search Params: ", service_type)
    if (!message) return null;
    const t = message;
    const [formValues, setFormValues] = useState({
        company_name: '',
        email: '',
        website_url: '',
        service_type: service_type || ''
    })
    const [errors, setErrors] = useState<formErrorsProps>({})
    const [success, setSuccess] = useState(false)
    const [pending, setPending] = useState(false)

    // for immediat checking validation
    useEffect(() => {
        // Skip if form is empty (initial load)
        if (!formValues.company_name && !formValues.email && !formValues.website_url) {
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
        // console.log('🚀 Submitting form... values: ', formValues)
        try {
            const resp = await fetch('/api/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues)
            })
            const data = await resp.json()
            if (!resp.ok) {
                setErrors(data.details || { message: [data.error] } || { message: "Back-end failed" })
                toast.error(data.errors || data.data.message, {
                    duration: 10000,
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
            } else {
                setSuccess(true)
                setFormValues({ company_name: '', email: '', website_url: '', service_type: '' })
                // console.log("successFull message: ", data.data.message)
                toast.success(data.data.message, {
                    duration: 5000,
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
            }
        } catch (error: any) {
            setErrors({ message: ['Network error'] })
            // console.log("NETWORK ERROR TRY LATER", error)
            toast.error(error.message, {
                duration: 10000,
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
        <Suspense>
            <div className={style.wrapper} >
                <div><Toaster position="top-right" /></div>
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
                            <label htmlFor="website_url" className={style.label}>{t.formAudit.formInput.labelInput4.L}</label>
                            <input
                                type="url"
                                id="website_url"
                                name="website_url"
                                value={formValues.website_url}
                                onChange={(e) => inputHandleFn(e)}
                                placeholder={t.formAudit.formInput.labelInput4.P}
                                title={t.formAudit.formInput.labelInput4.T}
                                className={style.input}
                                required
                            />
                            {errors?.website_url?.[0] && <p className="text-red-500 text-sm">{errors.website_url[0]}</p>}
                        </div>

                        {/* Project Type */}
                        <div className={style.formGroup}>
                            <label htmlFor="projectType" className={style.label}>{t.formAudit.formSelect.labelSelect1.L}</label>
                            <select
                                id="projectType"
                                name="service_type"
                                defaultValue={formValues.service_type}
                                className={style.select}
                                disabled={searchParams.length>0}
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
        </Suspense>

    )
}