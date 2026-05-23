"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Banner from "@/components/Banner";
import AvailableCars from "@/components/AvailableCars";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";

export default function HomePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    useEffect(() => {
        const userParam = searchParams.get("user");
        if (userParam) {
            try {
                const user = JSON.parse(decodeURIComponent(userParam));
                localStorage.setItem("user", JSON.stringify(user));
                router.replace("/");
            } catch (error) {
                console.error("Error parsing user:", error);
            }
        }
    }, [searchParams, router]);
    
    return (
        <>
            <Banner />
            <AvailableCars />
            <WhyChooseUs />
            <HowItWorks />
        </>
    );
}