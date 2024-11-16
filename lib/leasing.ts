// lib/leasing.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createLeasing = async (nama: string) => {
    return await prisma.leasing.create({
        data: { nama },
    });
};

export const getLeasing = async (id: number) => {
    return await prisma.leasing.findUnique({
        where: { id },
    });
};

export const updateLeasing = async (id: number, nama: string) => {
    return await prisma.leasing.update({
        where: { id },
        data: { nama },
    });
};

export const deleteLeasing = async (id: number) => {
    return await prisma.leasing.delete({
        where: { id },
    });
};
