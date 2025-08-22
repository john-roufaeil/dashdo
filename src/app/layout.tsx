import "./globals.css"

export const metadata = {
    title: "DashDo",
    description: "Dashboard with stats and todos",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-white text-gray-900">
                {children}
            </body>
        </html>
    )
}
