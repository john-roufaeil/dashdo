import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const days = parseInt(searchParams.get("days") || "30", 10);
  const dailyActiveUsers = Array.from({ length: days }, (_, i) => {
    const dateObj = new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return {
      date: `${day}/${month}/${year}`,
      users: Math.floor(Math.random() * 500) + 50,
    };
  });

  const groupType = searchParams.get("groups") || "regions";

  let demographics: { label: string; value: number }[] = [];

  if (groupType === "regions") {
    demographics = [
      "Europe",
      "Africa",
      "North America",
      "South America",
      "Asia",
      "Australia",
    ].map((r) => ({
      label: r,
      value: Math.floor(Math.random() * 25) + 10,
    }));
  } else {
    demographics = ["18-24", "25-34", "35-44", "45-54", "55+"].map((age) => ({
      label: age,
      value: Math.floor(Math.random() * 25) + 10,
    }));
  }

  const total = demographics.reduce((sum, d) => sum + d.value, 0);
  demographics = demographics.map((d) => ({
    ...d,
    value: Math.round((d.value / total) * 100),
  }));

  return NextResponse.json({
    dailyActiveUsers,
    demographics,
  });
}
