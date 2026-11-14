import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const MAX_QUANTITY = 10;
// Keep this in sync with the lightweight /admin panel password.
const ADMIN_PASSWORD = "vpv77";

export const createOrder = mutation({
  args: {
    customerName: v.string(),
    email: v.string(),
    address: v.string(),
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const customerName = args.customerName.trim().slice(0, 80);
    const email = args.email.trim().toLowerCase().slice(0, 160);
    const address = args.address.trim().replace(/\s+/g, " ").slice(0, 200);

    if (customerName.length < 2) {
      throw new Error("Ange ett namn så vi vet vem beställningen tillhör.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Ange en giltig e-postadress.");
    }
    if (address.length < 6) {
      throw new Error(
        "Ange en fullständig leveransadress med gata, postnummer och ort.",
      );
    }
    if (args.items.length === 0 || args.items.length > 12) {
      throw new Error("Varukorgen är tom eller innehåller för många rader.");
    }

    const items = args.items.map((item) => {
      const quantity = Math.floor(item.quantity);
      if (quantity < 1 || quantity > MAX_QUANTITY) {
        throw new Error("Ogiltig antal i varukorgen.");
      }
      return {
        productId: item.productId.slice(0, 80),
        name: item.name.trim().slice(0, 120),
        price: Math.max(0, Math.round(item.price)),
        quantity,
      };
    });

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return await ctx.db.insert("orders", {
      customerName,
      email,
      address,
      items,
      total,
      status: "new",
      createdAt: Date.now(),
    });
  },
});

export const listAdmin = query({
  args: {
    password: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.password !== ADMIN_PASSWORD) {
      return null;
    }

    const orders = await ctx.db.query("orders").collect();

    return orders
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((order) => ({
        id: order._id,
        customerName: order.customerName,
        email: order.email,
        address: order.address ?? "",
        items: order.items,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
      }));
  },
});
