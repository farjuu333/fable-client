import React from 'react';
import { Card } from '@heroui/react';

export const StatCard = ({ title, value, icon: Icon }) => {
    return (
        <Card className="bg-[#18181b] border border-neutral-800 rounded-2xl shadow-none">
            <div className="flex flex-col gap-4 p-5">
                {/* Icon Wrapper */}
                {Icon && (
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-800/50 text-neutral-300">
                        <Icon size={20} />
                    </div>
                )}
                {/* Content */}
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-neutral-400">
                        {title}
                    </span>
                    <span className="text-2xl font-bold text-white tracking-tight">
                        {value}
                    </span>
                </div>
            </div>
        </Card>
    );
};