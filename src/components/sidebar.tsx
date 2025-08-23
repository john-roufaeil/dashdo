// src/components/Sidebar.tsx
"use client";

import { Settings, Moon, Sun, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Sidebar = () => {
    const [theme, setTheme] = useState("light");

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex fixed left-0 top-0 h-full w-20 bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-gray-200 shadow-lg flex-col justify-between items-center py-6">

                <div className="flex flex-col items-center gap-6">
                    <Image
                        src="/logoFocus.png"
                        alt="DashDo Logo"
                        width={40}
                        height={40}
                        className="rounded"
                    />

                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="hover:cursor-pointer p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                    >
                        {theme === "light" ? (
                            <Moon className="w-5 h-5" />
                        ) : (
                            <Sun className="w-5 h-5" />
                        )}
                    </button>

                    <button className="hover:cursor-pointer p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>

                {/* Profile / Avatar */}
                <div className="flex flex-col items-center">
                    <button className="hover:cursor-pointer p-2 rounded-full bg-slate-300 dark:bg-slate-600 hover:opacity-80 transition">
                        <User className="w-6 h-6" />
                    </button>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="z-50 md:hidden fixed bottom-0 left-0 h-16 bg-slate-100 text-gray-800 shadow-lg border-t border-slate-200 w-full">
                <div className="flex justify-around items-center h-full px-4">
                    <Image
                        src="/logoFocus.png"
                        alt="DashDo Logo"
                        width={32}
                        height={32}
                        className="rounded"
                    />

                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="hover:cursor-pointer p-2 rounded-lg hover:bg-slate-200 transition"
                    >
                        {theme === "light" ? (
                            <Moon className="w-5 h-5" />
                        ) : (
                            <Sun className="w-5 h-5" />
                        )}
                    </button>

                    <button className="hover:cursor-pointer p-2 rounded-lg hover:bg-slate-200 transition">
                        <Settings className="w-5 h-5" />
                    </button>

                    <button className="hover:cursor-pointer p-2 rounded-full bg-slate-300 hover:opacity-80 transition">
                        <User className="w-5 h-5" />
                    </button>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
