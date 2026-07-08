import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import style from "../sign-in/sign.module.css"
import { ParamProps } from "@/app/[locale]/(marketing)/about/page";
import SignUpComp from "@/app/[locale]/assets/auth/signUp";
import { redirect } from "next/navigation";
export async function generateMetadata(params: Promise<{ locale: string }>): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "signUp" })
    return {
        title: t('title'),
        description: t('description'),
        keywords: t.raw('keywords').join(', '),
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/auth/sign-up`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/auth/sign-up`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/auth/sign-up`
            }
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            siteName: t('sitename'),
            type: "website",
            locale: locale === "fr" ? "fr_FR" : "en_US",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/auth/sign-up`
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
            images: [t("ogImage")]
        },
        robots: {
            index: false,
            follow: true,
        },
        authors: [{ name: "3sthreei" }],
        category: "3sthreei",
        publisher: "3sthreei",
    }
}
export default async function SignIn({ params }: ParamProps) {
    const { locale } = await params
    const t = (await import(`@/messages/${locale}/auth.json`)).default
    return redirect("/auth/sign-in");
    return (
        <main>
            <div className={style.container}>
                <div className={style.wrapper}>
                    {/* <SignUpComp messages={t.forms} /> */}
                    <div className={style.aside}>
                    </div>
                </div>
            </div>
        </main>
    )
}