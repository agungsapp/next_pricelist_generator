import React, { ChangeEvent, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { BiTrash } from "react-icons/bi";
import Link from "next/link";
import { saveDiskon } from "@/lib/diskon"; // Import fungsi saveDiskon

type RowData = {
    idMotor: number;
    idLeasing: number;
    idKota: number;
    pengurangan: number;
    diskonPromo: number;
    tenor: string; // Mendukung input multi-tenor (ex: "11,17")
    potonganTenor: number;
};

const FormDiskonCreate = () => {
    const [rows, setRows] = useState<RowData[]>([
        {
            idMotor: 0,
            idLeasing: 0,
            idKota: 0,
            pengurangan: 0,
            diskonPromo: 0,
            tenor: "",
            potonganTenor: 0,
        },
    ]);

    const handleInputChange = (
        rowIndex: number,
        field: keyof RowData,
        value: string
    ) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex][field] =
            field === "tenor" ? value : Number(value);
        setRows(updatedRows);
    };

    const addRow = () => {
        setRows([
            ...rows,
            {
                idMotor: 0,
                idLeasing: 0,
                idKota: 0,
                pengurangan: 0,
                diskonPromo: 0,
                tenor: "",
                potonganTenor: 0,
            },
        ]);
    };

    const deleteRow = (rowIndex: number) => {
        const updatedRows = rows.filter((_, index) => index !== rowIndex);
        setRows(updatedRows);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const diskonData = rows.map((row) => ({
            idMotor: row.idMotor,
            idLeasing: row.idLeasing,
            idKota: row.idKota,
            pengurangan: row.pengurangan,
            diskonPromo: row.diskonPromo,
            potonganTenor: row.potonganTenor,
            tenor: row.tenor
                .split(",")
                .map((t) => parseInt(t.trim(), 10))
                .filter((t) => !isNaN(t)), // Konversi tenor ke array angka
        }));

        const result = await saveDiskon(diskonData); // Kirim semua data sekaligus
        if (result?.Error) {
            console.error("Error saving data:", result.Error);
            alert("Gagal menyimpan data. Periksa log untuk detail.");
        } else {
            alert("Data berhasil disimpan!");
        }
    };

    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const response = await fetch("/api/sync", {
                method: "POST",
            });

            if (response.ok) {
                alert("Sinkronisasi berhasil!");
            } else {
                const errorData = await response.json();
                console.error("Error dari server:", errorData);
                alert("Sinkronisasi gagal. Periksa log untuk detail.");
            }
        } catch (error) {
            console.error("Error saat memanggil API:", error);
            alert("Sinkronisasi gagal. Periksa log untuk detail.");
        } finally {
            setIsSyncing(false);
        }
    };
    return (
        <div>
            <Link
                href={`/`}
                className="py-2 px-5 bg-blue-500 mb-5 text-white rounded-md"
            >
                Cek Data Diskon
            </Link>
            <button
                onClick={handleSync}
                disabled={isSyncing}
                className={`bg-blue-500 ms-8 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
                    isSyncing ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {isSyncing ? "Sinkronisasi..." : "Sinkronisasi Data"}
            </button>
            <form onSubmit={handleSubmit}>
                <Table>
                    <TableCaption>
                        Inputkan semua data mentah dan semua akan di proses
                        bersamaan.
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Motor</TableHead>
                            <TableHead>Leasing</TableHead>
                            <TableHead>Kota</TableHead>
                            <TableHead>Pengurangan</TableHead>
                            <TableHead>Diskon Promo</TableHead>
                            <TableHead>Tenor</TableHead>
                            <TableHead>Potongan Tenor</TableHead>
                            <TableHead className="w-[50px]">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell>
                                    <input
                                        type="number"
                                        value={row.idMotor}
                                        placeholder="motor"
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleInputChange(
                                                rowIndex,
                                                "idMotor",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="number"
                                        value={row.idLeasing}
                                        placeholder="leasing"
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleInputChange(
                                                rowIndex,
                                                "idLeasing",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="number"
                                        value={row.idKota}
                                        placeholder="kota"
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleInputChange(
                                                rowIndex,
                                                "idKota",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="number"
                                        value={row.pengurangan}
                                        placeholder="pengurangan"
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleInputChange(
                                                rowIndex,
                                                "pengurangan",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="number"
                                        value={row.diskonPromo}
                                        placeholder="diskon promo"
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleInputChange(
                                                rowIndex,
                                                "diskonPromo",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="text" // Mendukung input "11,17" untuk multi-tenor
                                        value={row.tenor}
                                        placeholder="tenor"
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleInputChange(
                                                rowIndex,
                                                "tenor",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="number"
                                        value={row.potonganTenor}
                                        placeholder="potongan tenor"
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleInputChange(
                                                rowIndex,
                                                "potonganTenor",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    />
                                </TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => deleteRow(rowIndex)}
                                        type="button"
                                        className="bg-red-800 py-2 px-3 rounded-sm text-2xl text-white hover:bg-red-500"
                                    >
                                        <BiTrash />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="mt-4">
                    <button
                        onClick={addRow}
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Tambah Baris
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-green-600"
                    >
                        Simpan Semua
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormDiskonCreate;
