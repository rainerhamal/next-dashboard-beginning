'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


// Validate and prepare the data. Type validation and coercion
const FormSchema = z.object( {
    id: z.string(),
    customerId: z.string( {
        invalid_type_error: 'Please select a customer',
    } ),
    amount: z.coerce.number().gt( 0, {
        message: 'Please enter an amount greater than $0.'
    } ),
    date: z.string(),
    status: z.enum( [ 'pending', 'paid' ], {
        invalid_type_error: 'Please select an invoice status.'
    } ),
} );

const CreateInvoice = FormSchema.omit( { id: true, date: true } )

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit( { id: true, date: true } );

// export async function createInvoice(formData: FormData) {
//     const rawFormData = {
//         customerId: formData.get('customerId'),
//         amount: formData.get('amount'),
//         status: formData.get('status'),
//     };
//     // Test it out:
//     console.log(rawFormData)

// pass your rawFormData to CreateInvoice to validate the types:

// update your createInvoice action to accept two parameters:
// This is temporary until @types/react-dom is updated
export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
}

export async function createInvoice ( prevState: State, formData: FormData )
{
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse( {
        customerId: formData.get( 'customerId' ),
        amount: formData.get( 'amount' ),
        status: formData.get( 'status' ),
    } );

    // return console.log(validatedFields) = { success: false, error: [Getter] }
    // If form validation fails, return errors early. Otherwise, continue.
    if ( !validatedFields.success )
    {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database:
    const { customerId, amount, status } = validatedFields.data;
    // Storing values in cents. It's usually good practice to store monetary values in cents in your database to eliminate JavaScript floating-point errors and ensure greater accuracy.
    const amountInCents = amount * 100;
    // Creating new dates
    const date = new Date().toISOString().split( 'T' )[ 0 ];

    // Insert data into the database
    try
    {
        // Inserting the data into your database
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${ customerId }, ${ amountInCents }, ${ status }, ${ date })`;
    }
    catch ( error )
    {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Invoice.'
        };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath( '/dashboard/invoices' );
    redirect( '/dashboard/invoices' );
}


// Update Invoice
export async function updateInvoice ( id: string, prevState: State, formData: FormData )
{
    const validatedFields = UpdateInvoice.safeParse( {
        customerId: formData.get( 'customerId' ),
        amount: formData.get( 'amount' ),
        status: formData.get( 'status' ),
    } );

    //If form validation fails, return errors early. Otherwise, continue.
    if ( !validatedFields.success )
    {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.'
        }
    }

    //Prepare data for update into the database:
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;


    try
    {
        // Updating the data into your database
        await sql`
            UPDATE invoices
            SET customer_id = ${ customerId }, amount = ${ amountInCents }, status = ${ status }
            WHERE id = ${ id }`;
    }
    catch ( error )
    {
        return {
            message: 'Database Error: Failed to Update Invoice.'
        };
    }

    revalidatePath( '/dashboard/invoices' );
    redirect( '/dashboard/invoices' );
}


// Delete Invoice
export async function deleteInvoice ( id: string )
{
    //simulate an error:
    throw new Error( 'Failed to Delete Invoice' );

    try
    {
        // Deleting the data from your database
        await sql`DELETE FROM invoices WHERE id = ${ id }`;
        revalidatePath( '/dashboard/invoices' );
        return { message: 'Deleted Invoice.' };
    }
    catch ( error )
    {
        return {
            message: 'Database Error: Failed to Delete Invoice.'
        };
    }
}