"use client"
import { useBetaContext } from "@/app/[locale]/context/betaContext"
import { useTranslations } from "next-intl"
export default function BetaNavbar() {
    const t = useTranslations()
    const BetaData: any = useBetaContext()
    if (!BetaData.beta) {
        return null
    }
    return (
        <>
            <div className="bg-[rgb(30,41,59)] sticky min-h-10 top-0 z-100 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 sm:text-[0.9] text-sm">
                <span className="bg-[rgb(4,125,14)] text-white w-8 h-8 flex  justify-center font-bold items-center rounded-full text-xs">
                    {t('beta.beta')}
                </span>
                <p className="text-[rgb(59,246,75)] font-semibold whitespace-nowrap">
                    {t('beta.text1')}
                </p>

                <p className="text-[rgb(248,250,252)] text-center">
                    {BetaData?.response?.months ? (
                        <>
                    {t('beta.text2')}
                            {" "}
                            <span className="text-[rgb(251,191,36)] font-semibold">
                                {BetaData.response.months}-{t('beta.month')}
                            </span>{" "}
                            {t('beta.text3')}
                        </>
                    ) : (
                        <>
                            Beta access ends in{" "}
                            <span className="text-[rgb(251,36,36)] font-semibold">
                                {BetaData.response}
                            </span>
                            . Upgrade now to continue enjoying all features.
                        </>
                    )}
                </p>
                <div className="">

                </div>
            </div>
        </>
    )
}