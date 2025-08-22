import "./globals.css"
import { Providers } from "@/app/providers"

export const metadata = {
    title: "DashDo",
    description: "Dashboard with stats and todos",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
