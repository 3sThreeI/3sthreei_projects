import { NextIntlClientProvider } from "next-intl"
import { ParamProps } from "../../(marketing)/about/page"
import CreatNewProjectComp from "../../assets/dashboard/AddProject"

export default async function DashProject({ params }: ParamProps) {
    const { locale } = await params
    const message = (await import(`@/messages/${locale}/forms.json`)).default
    return (

        <NextIntlClientProvider locale={locale} messages={message}>
          <CreatNewProjectComp /> {/* this component is client component*/}
        </NextIntlClientProvider>
    )
}