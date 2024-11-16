// lib/kota.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createKota = async (nama: string) => {
    return await prisma.kota.create({
        data: { nama },
    });
};

export const getKota = async (id: number) => {
    return await prisma.kota.findUnique({
        where: { id },
    });
};

export const updateKota = async (id: number, nama: string) => {
    return await prisma.kota.update({
        where: { id },
        data: { nama },
    });
};

export const deleteKota = async (id: number) => {
    return await prisma.kota.delete({
        where: { id },
    });
};
