"use client"
import style from "@/app/[locale]/assets/testimonial/testimonial.module.css"
import { testimonialSchema } from "@/lib/validation/testimonial"
import { useLocale, useTranslations } from "next-intl"
import React, { useEffect, useState } from "react"

interface ErrorsProps {
    fullname?: string[],
    feedback?: string[],
    message?: string[],
    file?: any
}
export default function TestimonialForm() {
    const t = useTranslations("formTestimonial")
    // -----------------------my state
    const [errors, setErrors] = useState<ErrorsProps>({})
    const [success, setSuccess] = useState(false)
    const [pending, setPending] = useState(false)
    const [formValues, SetFormValues] = useState({
        fullname: "",
        feedback: "",
        message: "",
        file: null
    })
    useEffect(() => {
        if (!formValues.fullname && !formValues.feedback && !formValues.file) return

        const result = testimonialSchema.safeParse(formValues)
        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors)
        } else {
            setErrors({})
        }
    }, [formValues])
    // ---------------handling submit 
    const HandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true)
        setErrors({})

        try {
            const resp = await fetch("/api/testimonial", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues)
            })
            const data = await resp.json()

            if (!resp.ok) {
                setErrors(data.details || { message: [data.error] } || { message: "Back-end failed" })
                console.log('❌ Details object:', data.details)
            } else {
                setSuccess(true)
                SetFormValues({ fullname: '', feedback: '', file: null, message: "" })
                console.log("successFull message: ", data.message)
            }
        } catch (error) {
            setErrors({ message: ['Network error'] })
            console.log("NETWORK ERROR TRY LATER", error)
        } finally {
            setPending(false)
        }
    }
    const inputHandleFn = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (e.target instanceof HTMLInputElement && e.target.type === "file") {
            SetFormValues(prev => ({
                ...prev,
                // file: e.target.files?.[0] || nullx
            }));
            return;
        }

        SetFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <div className={style.formTest}>
            <form action="" onSubmit={HandleSubmit} className={style.formContainer}>
                <h1 className={style.title}>Share Your Experience</h1>
                <div className={style.formGroup}>
                    <label htmlFor="fullname" className={style.lable}>{t("formInput.labelInput1.L")}</label>
                    <input type="text"
                        id="fullname"
                        name="fullname"
                        required
                        value={formValues.fullname}
                        onChange={(e) => inputHandleFn(e)}
                        placeholder={t("formInput.labelInput1.P")}
                        title={t("formInput.labelInput1.T")}
                        className={style.input}
                    />
                    {errors?.fullname?.[0] && <p className="text-red-500 text-sm">{errors?.fullname[0]}</p>}
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="feedback" className={style.label}>{t("formTextarea.labelTextarea1.L")}</label>
                    <textarea
                        id="feedback"
                        name="feedback"
                        value={formValues.feedback}
                        onChange={inputHandleFn}
                        placeholder={t("formTextarea.labelTextarea1.P")}
                        title={t("formTextarea.labelTextarea1.T")}
                        className={style.textarea}
                        rows={4}
                        required
                    />
                    {errors?.feedback?.[0] && <p className="text-red-500 text-sm">{errors?.feedback[0]}</p>}
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="file" className={style.lable}>{t("formInput.labelfile.L")}</label>
                    <input type="file" name="file" id="file"
                        onChange={inputHandleFn}
                        placeholder={t("formInput.labelfile.P")}
                        title={t("formInput.labelfile.T")}
                        className={style.input}
                        required
                    />
                    {errors?.file?.[0] && <p className="text-red-500 text-sm">{errors?.file[0]}</p>}
                </div>
                <button type="submit" disabled={pending} className={style.submitBtn} aria-label="submit contact form">
                    {pending ?
                        <span className={style.btnText}>
                            <svg className={style.spinner} viewBox="0 0 24 24" width="24" height="24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </span> :
                        <div>
                            <span className={style.btnText}>{t("btn")}</span>
                            <span className={style.btnIcon}>→</span> </div>
                    }
                </button>
            </form>
        </div>
    )
}