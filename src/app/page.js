"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Banner from "@/components/Banner";
import AvailableCars from "@/components/AvailableCars";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";

function GoogleAuthHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const userParam = searchParams.get("user");
        if (userParam) {
            try {
                const user = JSON.parse(decodeURIComponent(userParam));
                localStorage.setItem("user", JSON.stringify(user));
                router.replace("/");
            } catch (e) {}
        }
    }, [searchParams, router]);

    return null;
}

export default function HomePage() {
    return (
        <>
            <Suspense fallback={null}>
                <GoogleAuthHandler />
            </Suspense>
            <Banner />
            <AvailableCars />
            <WhyChooseUs />
            <HowItWorks />
        </>
    );
}