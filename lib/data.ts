import { sql } from '@vercel/postgres';
import {Product} from './definitions'

export async function getProductsByCategory (category: string) {
    try {
        const result = await sql`SELECT * FROM products WHERE category = ${category}`;
    // select random 12 products
    const randomProducts = result.rows.sort(() => 0.5 - Math.random()).slice(0, 12);
    return randomProducts as Product[]  
    } catch (error) {
        console.error('Database Error:', error);
    throw new Error('Failed to fetch products by category.');
    }
     
}