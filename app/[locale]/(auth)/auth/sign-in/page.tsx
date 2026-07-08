import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import style from "./sign.module.css"
import SignInComp from "@/app/[locale]/assets/auth/signIn";
import { ParamProps } from "@/app/[locale]/(marketing)/about/page";

type Props = {
    params: Promise<{ locale: string }>;
};
export async function generateMetadata(params: Promise<{ locale: string }>): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "signIn" })
    return {
        title: t('title'),
        description: t('description'),
        keywords: t.raw('keywords').join(', '),
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/auth/sign-in`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/auth/sign-in`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/auth/sign-in`
            }
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/auth/sign-in`,
            siteName: t('sitename'),
            type: "website",
            locale: locale === "fr" ? 'fr_FR' : 'en_US',
            images: [
                {
                    url: t('"ogImage'),
                    width: 1200,
                    height: 630,
                    alt: t("ogImageAlt"),
                },
            ]
        },
        twitter: {
            title: t('title'),
            description: t('description'),
            images: [t("ogImage")]
        },
        robots: {
            index: false,
            follow: true
        },
        authors: [{ name: "3sthreei" }],
        creator: "3sthreei",
        publisher: "3sthreei",
    }
}
export default async function SignIn({ params }: Props) {
    const { locale } = await params
    const t = (await import(`@/messages/${locale}/auth.json`)).default
    return (
        <main>
            <div className={style.container}>
                <div className={style.wrapper}>
                    <SignInComp messages={t.forms} />
                    <div className={style.aside}>
                    </div>
                </div>
            </div>
        </main>
    )
}