"use server";

import { SignupFormSchema, FormState, User } from "@/lib/definitions";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

// ...
export async function insertUser(user: User) {
  const { id, name, email } = user;

  try {
    const data = await sql`SELECT * FROM shop_users WHERE email = ${email}`;
    if (data.rows.length > 0) {
      return data.rows[0];
    }
    return await sql`INSERT INTO shop_users (user_id, name, email) VALUES (${id} ,${name}, ${email}) RETURNING *`;
  } catch (error) {
    console.error("Failed to insert user:", error);
    throw new Error("Failed to insert user.");
  }
}

export async function addToCart(
  userId: string,
  productId: string,
  price: string
) {
  try {
    // Check if user has an active cart
    const {
      rows: [cart],
    } = await sql`
  SELECT * FROM carts WHERE user_id = ${userId}
`;

    let cartId;
    if (!cart) {
      // Create a new cart
      const {
        rows: [newCart],
      } = await sql`
    INSERT INTO carts (user_id) VALUES (${userId}) RETURNING *
  `;
      cartId = newCart.cart_id;
    } else {
      cartId = cart.cart_id;
    }

    // Add the product to the cart
    await sql`
  INSERT INTO cart_items (cart_id, product_id, quantity, price)
  VALUES (${cartId}, ${productId}, 1,${price} )
`;

const cartItems = await getProductsManyByIds(userId);

    return cartItems;
  } catch (error) {
    console.error("Failed to insert into cart:", error);
  }
}

export async function getCartItems(userId: string) {
  try {
    const {
      rows: [cart],
    } = await sql`
  SELECT * FROM carts WHERE user_id = ${userId}
`;
    const { rows: cartItems } = await sql`
  SELECT * FROM cart_items WHERE cart_id = ${cart.cart_id}
`;
    const cartItemObjects = cartItems.map((item) => ({
      id: item.product_id,
    }));

    return cartItemObjects;
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
    return [];
  }
}

export async function getProductsManyByIds(userId: string) {
  try {    
    const result = await sql`
  SELECT p.*
  FROM cart_items ci
  INNER JOIN products p ON ci.product_id = p.id
  WHERE ci.cart_id IN (
    SELECT cart_id FROM carts WHERE user_id = ${userId}
  )
`;
    return result.rows ;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function removeFromCart(userId: string, productId: string) {
  try {
    const {
      rows: [cart],
    } = await sql`
  SELECT * FROM carts WHERE user_id = ${userId}
`;
    await sql`
    DELETE FROM cart_items
    WHERE cart_id = ${cart.cart_id}
    AND product_id = ${productId}
  `;

const cartItems = await getProductsManyByIds(userId);

    return cartItems;
  } catch (error) {
    console.error("Failed to remove from cart:", error);
  }
}

export async function clearCart(userId: string) {
  try {
    const {
      rows: [cart],
    } = await sql`
  SELECT * FROM carts WHERE user_id = ${userId}
`;
    await sql`
    DELETE FROM cart_items
    WHERE cart_id = ${cart.cart_id}
  `;
  } catch (error) {
    console.error("Failed to remove from cart:", error);
  }
}

export async function updateQuantity(userId: string, productId: string, quantity: number) {
  try {
    const {
      rows: [cart],
    } = await sql`
  SELECT * FROM carts WHERE user_id = ${userId}
`;
    await sql`
    UPDATE cart_items
    SET quantity = ${quantity}
    WHERE cart_id = ${cart.cart_id}
    AND product_id = ${productId}
  `;
  } catch (error) {
    console.error("Failed to update quantity:", error);
  }
}

export async function makeOrder(userId: string, total: number) {
  try {
    
    const {rows: [order]} = await sql`
    INSERT INTO orders (user_id, total_amount, status)
    VALUES (${userId}, ${total}, 'pending') RETURNING *
  `;
  const {rows: [cart]}  = await sql`
    SELECT * FROM carts WHERE user_id = ${userId}
  `;
  const {rows: cartItems} = await sql`
    SELECT * FROM cart_items WHERE cart_id = ${cart.cart_id}
  `;
  for (const item of cartItems) {
    await sql`
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (${order.order_id}, ${item.product_id}, ${item.quantity}, ${item.price})
    `;
  }
  await sql`
    DELETE FROM cart_items
    WHERE cart_id = ${cart.cart_id}
  `;

  } catch (error) {
    console.error("Failed to make order:", error);
  }
}

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const data = await insertUser(validatedFields.data);
  const user = data.rows[0];
  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }
  return redirect("/login");
}
