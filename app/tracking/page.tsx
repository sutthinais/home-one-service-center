"use client"
import React from 'react';


export default function TrackingPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    return (
        <div className="bg-red-500 min-h-screen max-h-screen flex items-center justify-center h-full w-full">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Tracking Page</h1>
                <p className="text-red-500">This is the tracking page content.</p>
            </div>
        </div>
    );
}
