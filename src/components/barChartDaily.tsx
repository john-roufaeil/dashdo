"use client";

import { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

type DAUData = {
    date: string;
    users: number;
};

const FILTERS = [
    { label: "Last 30 Days", value: 30 },
    { label: "Last 14 Days", value: 14 },
    { label: "Last 7 Days", value: 7 },
    { label: "Last 3 Days", value: 3 },
];

export default function BarChartDaily() {
    const [data, setData] = useState<DAUData[]>([]);
    const [filter, setFilter] = useState(30);
    const [, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`/api/stats?days=${filter}`)
            .then((res) => res.json())
            .then((json) => {
                // Extract the dailyActiveUsers array from the API response
                setData(json.dailyActiveUsers || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data");
                setData([]);
                setLoading(false);
            });
    }, [filter]);

    return (
        <div className="p-6 bg-white shadow-md rounded-2xl w-11/12 sm:w-1/3 border-2 m-2 border-slate-100">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Daily Active Users</h2>
                <select
                    value={filter}
                    onChange={(e) => setFilter(Number(e.target.value))}
                    className="border rounded p-1 text-sm "
                >
                    {FILTERS.map((f) => (
                        <option key={f.value} value={f.value}>
                            {f.label}
                        </option>
                    ))}
                </select>
            </div>

            {!error &&
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="users" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            }
        </div>
    );
}
