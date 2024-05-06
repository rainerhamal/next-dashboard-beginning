import Customers from "./customers/page";
import Invoices from "./invoices/page";


export default function Page() {

    return (
        <main>
            <Customers />
            <Invoices />
            <p>Dashboard Page</p>
        </main>
    );
}