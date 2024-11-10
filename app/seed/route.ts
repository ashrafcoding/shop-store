// import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { products } from '../lib/placeholders';

const client = await db.connect();

async function seedProducts() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(255) NOT NULL,
        img VARCHAR(255) NOT NULL
      );
    `;
  
    const insertedProducts = await Promise.all(
      products.map((product) => {
        const cost = Number(product.price?.slice(1));
        return client.sql`
          INSERT INTO products (id, name, price, description, category, img)
          VALUES (${product['_id']['$oid']}, ${product.name}, ${cost}, ${product.description}, ${product.category}, ${product.img})
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );
  
    return insertedProducts;
  }

  export async function GET() {
   
    try {
      await client.sql`BEGIN`;
      await seedProducts();
      await client.sql`COMMIT`;
  
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }