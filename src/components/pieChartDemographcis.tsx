"use client";

import { useEffect, useState } from "react";
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
} from "recharts";

type DemographicData = {
    label: string;
    value: number;
};

const COLORS = ["#8ecae6", "#219ebc", "#023047", "#ffb703", "#8b5cf6", "#fb8500", "#9a031e", "#0f4c5c"];

const GROUP_TYPES = [
    { label: "By Region", value: "regions" },
    { label: "By Age", value: "age" },
];

export default function PieChartDemographics() {
    const [data, setData] = useState<DemographicData[]>([]);
    const [groupType, setGroupType] = useState("regions");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`/api/stats?groups=${groupType}`)
            .then((res) => res.json())
            .then((json) => {
                setData(json.demographics || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data");
                setData([]);
                setLoading(false);
            });
    }, [groupType]);

    return (
        <div className="p-6 bg-white shadow-md rounded-2xl w-11/12 md:w-1/2 border-2 m-2 border-slate-100">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">User Demographics</h2>
                <select
                    value={groupType}
                    onChange={(e) => setGroupType(e.target.value)}
                    className="border rounded p-1 text-sm"
                >
                    {GROUP_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-gray-500">Loading...</div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-red-500">{error}</div>
                    </div>
                ) : (
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="label"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={({ percent }) =>
                                `${((percent || 0) * 100).toFixed(1)}%`
                            }
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value, name) => [`${value}%`, name]}
                        />
                        <Legend
                            formatter={(value) =>
                                `${value}`
                            }
                        />
                    </PieChart>
                )}
            </ResponsiveContainer>
        </div>
    );
}
