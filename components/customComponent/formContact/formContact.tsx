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
export default function FormContactCompt() {
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
                    <h1 className={style.title}>Let's Build Something Amazing</h1>
                    <p className={style.subtitle}>Tell us about your project and we'll get back to you within 24 hours</p>
                </div>

                <form onSubmit={HandleSubmit} aria-label="contact-form-for-building-project" className={style.form}>
                    {/* Full Name */}
                    <div className={style.formGroup}>
                        <label htmlFor="fullname" className={style.label}>Full Name</label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={formValues.fullname}
                            onChange={(e) => inputHandleFn(e)}
                            placeholder="e.g.ex:full name"
                            title="type your first Name and Last Name"
                            className={style.input}
                            required
                        />
                    </div>
                    {errors?.fullname?.[0] && <p className="text-red-500 text-sm">{errors?.fullname[0]}</p>}
                    {/* Email and Phone */}
                    <div className={style.grid}>
                        <div className={style.formGroup}>
                            <label htmlFor="email" className={style.label}>Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formValues.email}
                                onChange={(e) => inputHandleFn(e)}
                                placeholder="you@example.com"
                                title="type your email"
                                className={style.input}
                                required
                            />
                            {errors?.email?.[0] && <p className="text-red-500 text-sm">{errors?.email[0]}</p>}
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="phoneNumber" className={style.label}>Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formValues.phoneNumber}
                                onChange={(e) => inputHandleFn(e)}
                                placeholder="+233 0000000"
                                title="type your phone number"
                                className={style.input}
                                required
                            />
                            {errors?.phoneNumber?.[0] && <p className="text-red-500 text-sm">{errors?.phoneNumber[0]}</p>}

                        </div>
                    </div>

                    {/* Website URL */}
                    <div className={style.formGroup}>
                        <label htmlFor="website" className={style.label}>Website <span className={style.optional}>(Optional)</span></label>
                        <input
                            type="url"
                            id="website"
                            name="url"
                            value={formValues.url}
                            onChange={(e) => inputHandleFn(e)}
                            placeholder="https://yourwebsite.com"
                            title="please type your website url"
                            className={style.input}
                        />
                        {errors?.url?.[0] && <p className="text-red-500 text-sm">{errors.url[0]}</p>}
                    </div>

                    {/* Project Type */}
                    <div className={style.formGroup}>
                        <label htmlFor="projectType" className={style.label}>Project Type</label>
                        <select
                            id="projectType"
                            name="project_type"
                            value={formValues.project_type}
                            onChange={inputHandleFn}
                            className={style.select}
                            required
                            title="your project type"
                        >
                            <option value="">Select a project type...</option>
                            <option value="web">Web Site</option>
                            <option value="application">Application (Mobile, Desktop)</option>
                            <option value="design">Design</option>
                            <option value="gaming">Gaming</option>
                            <option value="audit">Audit your site</option>
                            <option value="marketing">Marketing</option>
                        </select>
                        {errors?.project_type?.[0] && <p className="text-red-500 text-sm">{errors?.project_type[0]}</p>}
                    </div>

                    {/* Message */}
                    <div className={style.formGroup}>
                        <label htmlFor="message" className={style.label}>Project Details</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formValues.message}
                            onChange={inputHandleFn}
                            placeholder="Tell us more about your project..."
                            title="describe your project"
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
                                <span className={style.btnText}>Send Message</span>
                                <span className={style.btnIcon}>→</span> </div>
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}