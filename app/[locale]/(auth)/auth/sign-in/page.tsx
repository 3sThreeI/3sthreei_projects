import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import style from "./sign.module.css"
import SignInComp from "@/app/[locale]/assets/auth/signIn";
import { ParamProps } from "@/app/[locale]/(marketing)/about/page";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};
export async function generateMetadata(params: Promise<{ locale: string }>): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "signIn" })
    const sitename = await getTranslations('sitenames') as any
    return {
        title: t('title'),
        description: t('description'),
        keywords: t.raw('keywords').join(', '),
        openGraph: {
            title: t('title'),
            description: t('description'),
            siteName: sitename,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/projects`
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/projects`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en`
            }
        },
        robots: {
            index: true,
            follow: true
        }
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