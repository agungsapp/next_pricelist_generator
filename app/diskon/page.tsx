"use client";

import React, { useState, useEffect } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";

type Diskon = {
    id: number;
    idMotor: number;
    idLeasing: number;
    idLokasi: number;
    diskon: number;
    diskonPromo: number;
    diskonDealer: number;
    tenor: number;
    potonganTenor: number;
};

const DiskonPage = () => {
    const [data, setData] = useState<Diskon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data dari API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/diskon");

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result = await response.json();
                setData(result); // Set data dari API ke state
            } catch (err) {
                console.error("Error fetching diskon data:", err);
                setError("Gagal mengambil data diskon.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columnHelper = createColumnHelper<Diskon>();

    const columns = [
        columnHelper.accessor("id", {
            header: "ID",
        }),
        columnHelper.accessor("idMotor", {
            header: "Motor",
        }),
        columnHelper.accessor("idLeasing", {
            header: "Leasing",
        }),
        columnHelper.accessor("idLokasi", {
            header: "Lokasi",
        }),
        columnHelper.accessor("diskon", {
            header: "Diskon",
        }),
        columnHelper.accessor("diskonPromo", {
            header: "Diskon Promo",
        }),
        columnHelper.accessor("diskonDealer", {
            header: "Diskon Dealer",
        }),
        columnHelper.accessor("tenor", {
            header: "Tenor",
        }),
        columnHelper.accessor("potonganTenor", {
            header: "Potongan Tenor",
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="container mx-auto py-4">
            <h1 className="text-2xl font-bold mb-4">Daftar Diskon</h1>
            {loading && <p>Loading data...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <table className="table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="border border-gray-300 px-4 py-2"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="border border-gray-300 px-4 py-2"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DiskonPage;
