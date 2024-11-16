// lib/diskon.ts

"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// Skema validasi untuk input data Diskon
const DiskonSchema = z.object({
    idMotor: z.number().int(),
    idLeasing: z.number().int(),
    idKota: z.number().int(),
    pengurangan: z.number().positive(),
    diskonPromo: z.number().positive(),
    tenor: z.union([z.number(), z.array(z.number())]), // Menerima angka atau array angka
    potonganTenor: z.number().positive(),
});

export const saveDiskon = async (formData: FormData) => {
    // Ambil semua data dari FormData sebagai string dan konversi ke tipe yang benar
    const dataToValidate = {
        idMotor: parseInt(formData.get("idMotor") as string, 10),
        idLeasing: parseInt(formData.get("idLeasing") as string, 10),
        idKota: parseInt(formData.get("idKota") as string, 10),
        pengurangan: parseFloat(formData.get("pengurangan") as string),
        diskonPromo: parseFloat(formData.get("diskonPromo") as string),
        potonganTenor: parseFloat(formData.get("potonganTenor") as string),
        tenor: (formData.get("tenor") as string)
            .split(",")
            .map((t) => parseInt(t.trim(), 10)) // Konversi tenor ke array angka
            .filter((t) => !isNaN(t)), // Hilangkan nilai invalid
    };

    const validatedFields = DiskonSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
        return {
            Error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const {
        idMotor,
        idLeasing,
        idKota,
        pengurangan,
        diskonPromo,
        potonganTenor,
        tenor,
    } = validatedFields.data;

    // Hitung nilai diskon
    const diskon = diskonPromo - pengurangan;

    // Siapkan data untuk dimasukkan ke database
    const entriesToSave = tenor.map((tenorValue) => ({
        idMotor,
        idLeasing,
        idLokasi: idKota,
        diskon,
        diskonPromo,
        diskonDealer: pengurangan,
        tenor: tenorValue,
        potonganTenor,
    }));

    try {
        await prisma.diskon.createMany({ data: entriesToSave });
    } catch (error) {
        return { message: `Failed to create diskon entries: ${error}` };
    }

    revalidatePath("/diskon");
    redirect("/diskon");
};
