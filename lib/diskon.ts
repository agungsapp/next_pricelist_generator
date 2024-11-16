"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

const DiskonSchema = z.object({
    idMotor: z.number().int(),
    idLeasing: z.number().int(),
    idKota: z.number().int(),
    pengurangan: z.number().positive(),
    diskonPromo: z.number().positive(),
    tenor: z.array(z.number()), // Array angka untuk tenor
    potonganTenor: z.number().nonnegative(),
});

export const saveDiskon = async (diskonData: any[]) => {
    // Validasi semua record
    const parsedData = diskonData.map((row) => DiskonSchema.safeParse(row));
    const invalidRows = parsedData.filter((result) => !result.success);

    if (invalidRows.length > 0) {
        return {
            Error: invalidRows.map(
                (result) => result.error.flatten().fieldErrors
            ),
        };
    }

    const entriesToSave = parsedData.flatMap((result) => {
        if (!result.success) return []; // Skip jika ada error (seharusnya tidak ada karena sudah difilter)
        const {
            idMotor,
            idLeasing,
            idKota,
            pengurangan,
            diskonPromo,
            tenor,
            potonganTenor,
        } = result.data;

        const diskon = diskonPromo - pengurangan;
        return tenor.map((tenorValue) => ({
            idMotor,
            idLeasing,
            idLokasi: idKota,
            diskon,
            diskonPromo,
            diskonDealer: 0,
            tenor: tenorValue,
            potonganTenor,
        }));
    });

    try {
        await prisma.diskon.createMany({ data: entriesToSave });
    } catch (error) {
        return { message: `Failed to create diskon entries: ${error}` };
    }

    revalidatePath("/diskon");
    redirect("/diskon");
};
