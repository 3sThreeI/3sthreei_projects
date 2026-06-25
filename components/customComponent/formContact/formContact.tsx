"use client"
import React, { useEffect, useState } from "react"
import style from "@/app/[locale]/(marketing)/contact-form/projectContactFom.module.css"
import { contactSchema } from "@/lib/validation/contact"
import { useSearchParams } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"
type formErrorsProps = {
    fullname?: string[],
    email?: string[],
    phone_number?: string[],
    description?: string[],
    url?: string[],
    project_type?: string[]
}
export default function FormContactCompt({ message, searchParams }: { message: any, searchParams:any }) {
    const Price: string = searchParams?.price ?? ""
    const type: string = searchParams?.type ?? ""

    console.log("formContact.tsx rendered", searchParams)
    const t = message || null
    const [formValues, SetFormValues] = useState({
        fullname: '',
        email: '',
        phone_number: '',
        description: '',
        url: '',
        project_type: type || '',
        price: Price || ''
    })
    const [errors, setErrors] = useState<formErrorsProps>({})
    const [success, setSuccess] = useState(false)
    const [pending, setPending] = useState(false)

    useEffect(() => {
        // Skip if form is empty (initial load)
        if (!formValues.fullname && !formValues.email && !formValues.description && !formValues.phone_number) {
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


    const HandleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true)
        setErrors({})
        // console.log('🚀 Submitting form...')
        // console.log('Form data:', formValues)
        try {
            const resp = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues)
            })
            const data = await resp.json()
            if (!resp.ok) {
                setErrors(data.details || { description: [data.errors] } || { description: "Back-end failed" })
                // console.log('❌ Full error details:', data)
                // console.log('❌ Details object:', data.details)
                toast.error( data.errors || data.data.message , {
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
                SetFormValues({ fullname: '', email: '', description: '', phone_number: '', url: '', project_type: '', price: "" })
                // console.log("successFull message: ", data.data.message)
                toast.success(data.data.message, {
                    duration: 15000,
                    style: {
                        border: '1px solid green',
                        padding: '16px',
                        color: 'green',
                    },
                    iconTheme: {
                        primary: 'green',
                        secondary: 'white',
                    },
                }
                )
            }
        } catch (error:any) {
            setErrors({ description: ['Network error'] })
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
    const inputHandleFn = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        SetFormValues({ ...formValues, [name]: value })
    }
    return (
        <div className={style.wrapper}>
            <div><Toaster position="top-right"/></div>
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
                            <label htmlFor="phone_number" className={style.label}>{t.formContact.formInput.labelInput3.L}</label>
                            <input
                                type="tel"
                                id="phone_number"
                                name="phone_number"
                                value={formValues.phone_number}
                                onChange={(e) => inputHandleFn(e)}
                                placeholder={t.formContact.formInput.labelInput3.P}
                                title={t.formContact.formInput.labelInput3.T}
                                className={style.input}
                                required
                            />
                            {errors?.phone_number?.[0] && <p className="text-red-500 text-sm">{errors?.phone_number[0]}</p>}
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
                    <div className={`${Price ? style.grid : ''}`}>

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
                                    t?.formContact?.formSelect?.labelSelect1?.Opt?.map((opt: any, index: number) => (
                                        <option key={index} value={opt.key}>{opt.value}</option>
                                    ))
                                }
                            </select>
                            {errors?.project_type?.[0] && <p className="text-red-500 text-sm">{errors?.project_type[0]}</p>}
                        </div>
                        <div className={style.formGroup}>
                            {
                                (Price) &&
                                <>
                                    <label htmlFor="price" className={style.label}>{t.formContact.formSelect.labelSelect2.L}</label>

                                    <select
                                        id="price"
                                        name="price"
                                        value={formValues.price}
                                        onChange={inputHandleFn}
                                        className={style.select}
                                        required
                                        title={t.formContact.formSelect.labelSelect2.T}
                                    >
                                        {/* option of select */}
                                        {/* we are making the price dynamique in forms we have price for web(OtpWeb) et price for app(OtpApp) */}
                                        {/* there price are difference same if we have for design and game  */}
                                        {
                                            type === "web" &&
                                            t?.formContact?.formSelect?.labelSelect2?.OptWeb?.map((opt: any, index: number) => (
                                                <option key={index} value={opt.key}>{opt.value}</option>
                                            ))
                                        }
                                        {
                                            type === "app" &&
                                            t?.formContact?.formSelect?.labelSelect2?.OptApp?.map((opt: any, index: number) => (
                                                <option key={index} value={opt.key}>{opt.value}</option>
                                            ))
                                        }
                                    </select></>
                            }
                            {/* {errors?.price?.[0] && <p className="text-red-500 text-sm">{errors?.price[0]}</p>} */}
                        </div>
                    </div>

                    {/* Message */}
                    <div className={style.formGroup}>
                        <label htmlFor="description" className={style.label}>{t.formContact.formTextarea.labelTextarea1.L}</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formValues.description}
                            onChange={inputHandleFn}
                            placeholder={t.formContact.formTextarea.labelTextarea1.P}
                            title={t.formContact.formTextarea.labelTextarea1.T}
                            className={style.textarea}
                            rows={5}
                            required
                        />
                        {errors?.description?.[0] && <p className="text-red-500 text-sm">{errors?.description[0]}</p>}
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
                                <span className={style.btnText}>{t.formContact.btn}</span>
                                <span className={style.btnIcon}>→</span> </div>
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}