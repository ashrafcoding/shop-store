"use server";
import { sql } from "@vercel/postgres";
import { Product } from "./definitions";

export async function getProductsByCategory(category: string) {
  try {
    const result =
      await sql`SELECT * FROM products WHERE category = ${category} ORDER BY RANDOM()  LIMIT 12`;
    return result.rows as Product[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products by category.");
  }
}

export async function getProductById(id: string) {
  try {
    const result = await sql`SELECT * FROM products WHERE id = ${id}`;
    return result.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product by ID.");
  }
}

export async function getOneFromCategory() {
  try {
    const result =
      await sql`SELECT DISTINCT ON (p.category) p.id, p.name, p.price, p.category, p.description, p.img
                FROM products p
                ORDER BY p.category, p.id;`;
    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
}
