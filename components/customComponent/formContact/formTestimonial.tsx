"use client"
import { ParamProps } from "@/app/[locale]/(marketing)/about/page"
import style from "@/app/[locale]/assets/testimonial/testimonial.module.css"
import { testimonialSchema } from "@/lib/validation/testimonial"
import { useLocale, useTranslations } from "next-intl"
import React, { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { any, file } from "zod"

interface ErrorsProps {
    fullname?: string[],
    feedback?: string[],
    message?: string[],
    file?: string[0]
}
export default function TestimonialForm() {
    // console.log("Locale: ", locale)
    const t = useTranslations("formTest")
    // -----------------------my state
    const [errors, setErrors] = useState<ErrorsProps>({})
    const [success, setSuccess] = useState(false)
    const [pending, setPending] = useState(false)
    const [formValues, SetFormValues] = useState({
        fullname: "",
        feedback: "",
        file: null as File | null
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

        const formdata = new FormData()
        // Object.entries(formValues).forEach(([key, value]) => {
        //     if (key !== "file") {
        //         if (value) formdata.append(key, value)
        //     }
        //     if (key == "file" && value) {
        //         console.log("enterred here")
        //         formdata.append("Img_url", value)
        //     }
        // })
        formdata.append("fullname", formValues.fullname)
        formdata.append("feedback", formValues.feedback)
        formdata.append("Img_url", formValues.file!)
        // console.log("JSON FORMAT OF FormData: ", JSON.parse(formdata))
        try {
            const resp = await fetch("/api/customers/feedback", {
                method: "POST",
                headers: {"Accept-Language": "fr"},
                body: formdata
            })
            const data = await resp.json()
            // console.log('❌ Details object:', data)
            if (!resp.ok) {
                setErrors(data.details || { message: [data.errors || "Back-end failed"] })
                console.log('❌ Details object:', data)
                toast.error(data.errors || data.details || "Back-end failed", {
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
            } else {
                setSuccess(true)
                SetFormValues({ fullname: '', feedback: '', file: null  })
                // console.log("Sumbit successFully: ", data)
                toast.success(data.message || data.data.message || "Successfully", {
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
            console.log('My image files : ', formValues)
            }
            
        } catch (error:any) {
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
    const inputHandleFn = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        SetFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("event:", e.target)
        SetFormValues(prev => ({
            ...prev,
            file: e.target.files?.[0] ?? null
        }))
    }
    return (
        <div className={style.formTest}>
            <div><Toaster position="top-right" /></div>
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
                        onChange={handleFileChange}
                        placeholder={t("formInput.labelfile.P")}
                        title={t("formInput.labelfile.T")}
                        className={style.input}
                        required
                    />
                    {errors?.file?.[0] && <p className="text-red-500 text-sm">{errors?.file?.[0]}</p>}
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