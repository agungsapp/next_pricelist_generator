import { NextResponse } from "next/server";
import { syncData } from "@/lib/sync"; // Import fungsi sinkronisasi

export async function POST() {
    try {
        await syncData(); // Panggil fungsi sinkronisasi
        return NextResponse.json({ message: "Sinkronisasi berhasil!" });
    } catch (error: any) {
        console.error("Error saat sinkronisasi:", error.message || error);
        return NextResponse.json(
            { message: "Sinkronisasi gagal", error: error.message },
            { status: 500 }
        );
    }
}

export function GET() {
    return NextResponse.json(
        { message: "Gunakan metode POST untuk sinkronisasi data." },
        { status: 405 }
    );
}
