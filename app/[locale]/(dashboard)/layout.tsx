import "./globalDash.module.css"
interface props {
    children: React.ReactNode,
    params: Promise<{ locale: string }>
}
export default function DashboardRootLayout({ children, params }: props) {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}