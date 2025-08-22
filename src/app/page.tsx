import Sidebar from '@/components/sidebar';
export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-6">
            <Sidebar />
            <h1 className="text-3xl font-bold text-primary">Tasklytics Dashboard</h1>
            <p className="text-gray-600">
                Your all-in-one stats and todos app.
            </p>
        </main>
    )
}
