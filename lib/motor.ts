// lib/motor.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMotor = async (nama: string) => {
    return await prisma.motor.create({
        data: { nama },
    });
};

export const getMotor = async (id: number) => {
    return await prisma.motor.findUnique({
        where: { id },
    });
};

export const updateMotor = async (id: number, nama: string) => {
    return await prisma.motor.update({
        where: { id },
        data: { nama },
    });
};

export const deleteMotor = async (id: number) => {
    return await prisma.motor.delete({
        where: { id },
    });
};
