import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Shared password for the lightweight /admin panel. The check lives here on the
// server so the signup list is never included in the public client bundle.
const ADMIN_PASSWORD = "vpv77";

export const subscribe = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
    idea: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase().slice(0, 160);
    const source = args.source?.trim().slice(0, 80) || "juldroppet";
    const idea = args.idea?.trim().slice(0, 500) || undefined;

    if (!emailPattern.test(email)) {
      throw new Error("Ange en giltig e-postadress.");
    }

    const existing = await ctx.db
      .query("dropSignups")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existing) {
      if (idea && !existing.idea) {
        await ctx.db.patch(existing._id, { idea });
      }
      return { status: "already" as const };
    }

    await ctx.db.insert("dropSignups", {
      email,
      source,
      ...(idea ? { idea } : {}),
      createdAt: Date.now(),
    });

    return { status: "new" as const };
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

    const signups = await ctx.db.query("dropSignups").collect();

    return signups
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((signup) => ({
        email: signup.email,
        source: signup.source ?? "juldroppet",
        idea: signup.idea,
        createdAt: signup.createdAt,
      }));
  },
});
