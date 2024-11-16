"use client";

import FormDiskonCreate from "@/components/form/diskonCreate";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import React from "react";

const DiskonCreate = () => {
    return (
        <div className="w-full  py-20 flex justify-center">
            <Card className="w-[80%]">
                <CardHeader>
                    <CardTitle>Generate Diskon Motor</CardTitle>
                    <CardDescription>
                        Pricelist & Diskon Generator
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FormDiskonCreate />
                </CardContent>
            </Card>
        </div>
    );
};

export default DiskonCreate;
