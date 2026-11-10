import { mutation } from "./_generated/server";
import { v } from "convex/values";

const MAX_QUANTITY = 10;

export const createOrder = mutation({
  args: {
    customerName: v.string(),
    email: v.string(),
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

    if (customerName.length < 2) {
      throw new Error("Ange ett namn så vi vet vem beställningen tillhör.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Ange en giltig e-postadress.");
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
      items,
      total,
      status: "new",
      createdAt: Date.now(),
    });
  },
});
