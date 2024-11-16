import { columns } from "./columns";
import { DataTable } from "./data-table";

async function fetchDiskon() {
    const response = await fetch("http://localhost:3000/api/diskon", {
        cache: "no-store",
    });
    if (!response.ok) throw new Error("Failed to fetch diskon data");
    return response.json();
}

export default async function DiskonPage() {
    const data = await fetchDiskon();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Daftar Diskon</h1>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
