"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Diskon = {
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

export const columns: ColumnDef<Diskon>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "idMotor", header: "Motor" },
    { accessorKey: "idLeasing", header: "Leasing" },
    { accessorKey: "idLokasi", header: "Lokasi" },
    { accessorKey: "diskon", header: "Diskon" },
    { accessorKey: "diskonPromo", header: "Diskon Promo" },
    { accessorKey: "diskonDealer", header: "Diskon Dealer" },
    { accessorKey: "tenor", header: "Tenor" },
    { accessorKey: "potonganTenor", header: "Potongan Tenor" },
];
