"use client"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { projectsSchema } from "@/lib/validation/project"
import style from "./project.module.css"
import { useTranslations } from "next-intl"

interface ErrorProps {
    name?: string[],
    url?: string[],
    description?: string[],
    type?: string[],
    image?: string[]
}
export default function CreatNewProjectComp() {
    const t = useTranslations("formProject")
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<ErrorProps>({})
    const [formValue, setFormvalue] = useState({
        name: "",
        url: "",
        description: "",
        type: "",
        image: null as File | null
    })
    useEffect(() => {
        if (!formValue.name || !formValue.url || !formValue.description || !formValue.type || !formValue.image) {
            const checkFields = projectsSchema.safeParse(formValue)
            if (!checkFields.success) {
                setErrors(checkFields.error.flatten().fieldErrors)
            } else {
                setErrors({})
            }
        }
    }, [formValue])
    const SubmitForm = async (event: React.FormEvent) => {
        event.preventDefault()
        setLoading(true)
        setErrors({})

        const formdata = new FormData()

        formdata.append("name", formValue.name)
        formdata.append("url", formValue.url)
        formdata.append("description", formValue.description)
        formdata.append("type", formValue.type)
        formdata.append("img_url", formValue.image!)
        console.log("this is form values", formValue)
        try {
            const resp = await fetch("/api/projects", {
                method: "POST",
                body: formdata
            })
            const data = await resp.json()
            // console.log("*****DATA", data)
            if (!resp.ok) {
                console.log("Server Error", data.Error)
               return toast.error(data.errors || data.data.message, {
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
            } else {
                console.log("New Project Sumitted", data)
                setFormvalue({ name: "", url: "", description: "", type: "", image: null })
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
            }
        } catch (error: any) {
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
        }finally{
            setLoading(false)
            setErrors({})
        }
    }
    const inputHandleFn = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormvalue(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("event:", e.target)
        setFormvalue(prev => ({
            ...prev,
            image: e.target.files?.[0] ?? null
        }))
    }
    return (
        <div className={style.formTest}>
            <div><Toaster position="top-right" /></div>
            <form action="" onSubmit={SubmitForm} className={style.formContainer}>
                <h1 className={style.title}>{t("headTitle")}</h1>
                <div className={style.formGroup}>
                    <label htmlFor="name" className={style.lable}>{t("formInput.labelInput1.L")}</label>
                    <input type="text"
                        id="name"
                        name="name"
                        required
                        value={formValue.name}
                        onChange={inputHandleFn}
                        placeholder={t("formInput.labelInput1.P")}
                        title={t("formInput.labelInput1.T")}
                        className={style.input}
                    />
                    {errors?.name?.[0] && <p className="text-red-500 text-sm">{errors?.name[0]}</p>}
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="url" className={style.lable}>{t("formInput.labelInput2.L")}</label>
                    <input type="text"
                        id="url"
                        name="url"
                        required
                        value={formValue.url}
                        onChange={inputHandleFn}
                        placeholder={t("formInput.labelInput2.P")}
                        title={t("formInput.labelInput2.T")}
                        className={style.input}
                    />
                    {errors?.url?.[0] && <p className="text-red-500 text-sm">{errors?.url[0]}</p>}
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="type" className={style.lable}>{t("formInput.labelInput3.L")}</label>
                    <input type="text"
                        id="type"
                        name="type"
                        required
                        value={formValue.type}
                        onChange={inputHandleFn}
                        placeholder={t("formInput.labelInput3.P")}
                        title={t("formInput.labelInput3.T")}
                        className={style.input}
                    />
                    {errors?.type?.[0] && <p className="text-red-500 text-sm">{errors?.type[0]}</p>}
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="descrption" className={style.label}>{t("formTextarea.labelTextarea1.L")}</label>
                    <textarea
                        id="feedback"
                        name="description"
                        value={formValue.description}
                        onChange={inputHandleFn}
                        placeholder={t("formTextarea.labelTextarea1.P")}
                        title={t("formTextarea.labelTextarea1.T")}
                        className={style.textarea}
                        rows={4}
                        required
                    />
                    {errors?.description?.[0] && <p className="text-red-500 text-sm">{errors?.description[0]}</p>}
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="image" className={style.lable}>{t("formFile.file1.L")}</label>
                    <input type="file" name="image" id="image"
                        onChange={handleFileChange}
                        placeholder={t("formFile.file1.P")}
                        title={t("formFile.file1.T")}
                        className={style.input}
                        required
                    />
                    {errors?.image?.[0] && <p className="text-red-500 text-sm">{errors?.image?.[0]}</p>}
                </div>
                <button type="submit" disabled={loading} className={style.submitBtn} aria-label="submit contact form">
                    {loading ?
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