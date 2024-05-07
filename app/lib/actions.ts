'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


// Validate and prepare the data. Type validation and coercion
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    date: z.string(),
    status: z.enum(['pending', 'paid']),
});

const CreateInvoice = FormSchema.omit({id: true, date: true})

// export async function createInvoice(formData: FormData) {
//     const rawFormData = {
//         customerId: formData.get('customerId'),
//         amount: formData.get('amount'),
//         status: formData.get('status'),
//     };
//     // Test it out:
//     console.log(rawFormData)

// pass your rawFormData to CreateInvoice to validate the types:
export async function createInvoice(formData: FormData) {
    const {customerId, amount, status} = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // Storing values in cents. It's usually good practice to store monetary values in cents in your database to eliminate JavaScript floating-point errors and ensure greater accuracy.
    const amountInCents = amount * 100;

    // Creating new dates
    const date = new Date().toISOString().split('T')[0];

    // Inserting the data into your database
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

    // Revalidate and redirect
    revalidatePath('/dashboard/invoices');

    // redirect the user back to the /dashboard/invoices page
    redirect('/dashboard/invoices');
}