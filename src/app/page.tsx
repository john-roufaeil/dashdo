import BarChartDaily from '@/components/barChartDaily';
import PieChartDemographics from '@/components/pieChartDemographcis';
import Sidebar from '@/components/sidebar';
import TodoList from '@/components/todoList';
export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-6 md:ml-20 pb-20 md:pb-6">
            <Sidebar />
            <h1 className="text-3xl font-bold text-primary mt-12">DashDo Dashboard</h1>
            <p className="text-gray-600">
                Your all-in-one stats and todos app.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 w-full mx-auto items-center justify-center">
                <BarChartDaily />
                <PieChartDemographics />
            </div>
            <div className="w-11/12 sm:w-2/3">
                <TodoList />
            </div>
        </main>
    )
}
