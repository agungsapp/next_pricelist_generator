import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const diskon = await prisma.diskon.findMany();
        return NextResponse.json(diskon);
    } catch (error) {
        console.error("Error fetching diskon data:", error);
        return NextResponse.json(
            { error: "Failed to fetch data" },
            { status: 500 }
        );
    }
}
