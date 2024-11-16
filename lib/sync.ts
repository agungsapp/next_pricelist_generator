import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();
const BASE_API_URL = process.env.BASE_API_URL || "http://localhost:8000/api";

export const syncData = async () => {
    try {
        // Ambil data dari endpoint eksternal
        const response = await axios.get(`${BASE_API_URL}/all-klm`);
        const { kota, leasing, motor } = response.data.data;

        console.log("Data yang diterima dari API:", { kota, leasing, motor });

        // Sinkronisasi data Kota
        for (const item of kota) {
            console.log("Menyinkronkan kota:", item);
            await prisma.kota.upsert({
                where: { id: item.id },
                update: { nama: item.nama },
                create: { id: item.id, nama: item.nama },
            });
        }

        // Sinkronisasi data Leasing
        for (const item of leasing) {
            console.log("Menyinkronkan leasing:", item);
            await prisma.leasing.upsert({
                where: { id: item.id },
                update: { nama: item.nama },
                create: { id: item.id, nama: item.nama },
            });
        }

        // Sinkronisasi data Motor
        for (const item of motor) {
            console.log("Menyinkronkan motor:", item);
            await prisma.motor.upsert({
                where: { id: item.id },
                update: { nama: item.nama },
                create: { id: item.id, nama: item.nama },
            });
        }

        console.log("Data berhasil disinkronkan!");
    } catch (error: any) {
        console.error("Gagal menyinkronkan data:", error.message || error);
        if (error.meta) {
            console.error("Detail error meta:", error.meta);
        }
    }
};
