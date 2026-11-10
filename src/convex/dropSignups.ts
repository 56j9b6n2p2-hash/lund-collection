import { mutation } from "./_generated/server";
import { v } from "convex/values";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const subscribe = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase().slice(0, 160);
    const source = args.source?.trim().slice(0, 80) || "juldroppet";

    if (!emailPattern.test(email)) {
      throw new Error("Ange en giltig e-postadress.");
    }

    const existing = await ctx.db
      .query("dropSignups")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existing) {
      return { status: "already" as const };
    }

    await ctx.db.insert("dropSignups", {
      email,
      source,
      createdAt: Date.now(),
    });

    return { status: "new" as const };
  },
});
