import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import ProjectHero from "../../assets/projects/ProjectHero";
import { NextIntlClientProvider } from "next-intl";
import Projects from "../../assets/projects/projects";

type Props = {
    params: { locale: string };
}
export async function generateMetadata(params: Promise<{ locale: any }>): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "common" })
    return {
        title: t('project.title'),
        description: t('project.description'),
        keywords: t.raw('project.keywords').join(', '),
        openGraph: {
            title: t('project.title'),
            description: t('project.description'),
            siteName: t('sitename'),
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/projects`
        },
        alternates: {
            canonical: `/${locale}/projects`
        }
    }
}
export default async function OurProjects({params}:Props) {
    const { locale } = await params 
    const message = (await import(`@/messages/${locale}/projects.json`)).default
    console.log("***********__project page rendered")
    return (
        <NextIntlClientProvider>
            <section>
                <ProjectHero message={message}/>
            </section>
            <section>
                <Projects message={message} />
            </section>
        </NextIntlClientProvider>
    )
}