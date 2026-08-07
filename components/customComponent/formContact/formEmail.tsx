"use client"

import { FormEvent, useState } from "react"
import styles from "./formEmail.module.css"

type EmailFormProps = {
    eyebrow: string
    title: string
    description: string
    label: string
    placeholder: string
    button: string
    note: string
}

export default function EmailForm({
    eyebrow,
    title,
    description,
    label,
    placeholder,
    button,
    note,
}: EmailFormProps) {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!email.trim()) {
            setStatus("Please enter your email address.")
            return
        }

        setIsSubmitting(true)
        setStatus("")

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/newsletter/blog/email?q=seo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            if (!response.ok) {
                throw new Error("Unable to submit your email right now.")
            }

            setStatus("Thanks for subscribing!")
            setEmail("")
        } catch (error) {
            setStatus(error instanceof Error ? error.message : "Something went wrong.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <p className={styles.eyebrow}>{eyebrow}</p>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="subscribe-email" className={styles.srOnly}>{label}</label>
                    <input
                        type="email"
                        id="subscribe-email"
                        name="email"
                        placeholder={placeholder}
                        className={styles.input}
                        aria-label={label}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <button type="submit" className={styles.button} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : button}
                    </button>
                </form>
                {status ? <p className={styles.note}>{status}</p> : <p className={styles.note}>{note}</p>}
            </div>
        </div>
    )
}