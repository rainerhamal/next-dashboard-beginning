// import Customers from "./customers/page";
// import Invoices from "./invoices/page";
import CardWrapper, { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data"; //remove fetchRevenue (for streaming component purposes)

// import <suspense> from react to wrap <RevenueChart/>. You can passit a fallback component called <RevenueChartSkeleton/>
import { Suspense } from "react";
import { 
    RevenueChartSkeleton,
    LatestInvoicesSkeleton,
    CardsSkeleton,
 } from "@/app/ui/skeletons";
 import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page() {
    // const revenue = await fetchRevenue(); //delet this line (for streaming component purposes)
    // const latestInvoices = await fetchLatestInvoices();
    // const cardData = fetchCardData(); 
    // OR 
    // const {
    //     numberOfInvoices,
    //     numberOfCustomers,
    //     totalPaidInvoices,
    //     totalPendingInvoices,
    //   } = await fetchCardData();

    return (
        
        <main>
            {/* <Customers />
            <Invoices /> */}
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard Page
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* <Card title="Collected" value={(await cardData).totalPaidInvoices} type="collected" />
                <Card title="Pending" value={(await cardData).totalPendingInvoices} type="pending" />
                <Card title="Total Invoices" value={(await cardData).numberOfInvoices} type="invoices" />
                <Card
                title="Total Customers"
                value={(await cardData).numberOfCustomers}
                type="customers"
                /> */}
                <Suspense fallback={<CardsSkeleton/>}>
                    <CardWrapper/>
                </Suspense>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton/>}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton/>}>
                    <LatestInvoices />
                </Suspense>
                
            </div>
        </main>
    );
}