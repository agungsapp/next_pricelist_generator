import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
    return (
        <div className="w-full h-screen  flex justify-center items-center">
            <Card className="w-[550px]">
                <CardHeader>
                    <CardTitle>Welcome !</CardTitle>
                    <CardDescription>
                        Pricelist & Diskon Generator
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className=" flex gap-3  flex-col">
                        <Link
                            href="/"
                            className=" py-3 px-5 bg-slate-800 text-white rounded-lg"
                        >
                            Generate Price List
                        </Link>
                        <Link
                            href="/diskon/create"
                            className=" py-3 px-5 bg-blue-800 text-white rounded-lg"
                        >
                            Generate Diskon Motor
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
