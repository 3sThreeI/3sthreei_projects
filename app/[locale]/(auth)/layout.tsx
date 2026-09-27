import "@/app/globals.css"
interface Props {
    children: React.ReactNode,
    params: Promise<{ locale: string }>
}
export default async function Rootlayout({
    children,
    params
}: Props) {
    return (
        <>
            <html>
                <body>
                    {children}
                </body>
            </html>
        </>
    )
}