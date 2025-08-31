import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";

// USER
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// SESSION
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

// ACCOUNT
export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  wallet: text("wallet"),
});

// VERIFICATION
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

// CUSTOMER
export const customer = pgTable("customer", {
  id: text("id").primaryKey(),
  wallet: text("wallet").notNull().unique(),
  email: text("email").unique(),
});

// PRODUCT
const productStatus = pgEnum("product_status", [
  "active",
  "inactive",
  "archived",
]);

const productType = pgEnum("product_type", ["one_time", "subscription"]);

export const currency = pgTable("currency", {
  id: text("id").primaryKey(),
  symbol: text("code").notNull().unique(), // e.g. USD, EUR, sBTC
  name: text("name").notNull(),
});

export const product = pgTable("product", {
  id: text("id").primaryKey(),
  merchantId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  type: productType("type").notNull().default("subscription"),
  price: text("price").notNull(),
  discounts: jsonb("discounts").default("[]"), // array of discount objects
  currencyId: text("currency_id")
    .notNull()
    .references(() => currency.id, { onDelete: "restrict" }),
  images: text("images").array().default([]),
  metadata: jsonb().default("{}"),
  status: productStatus("status").notNull().default("active"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// PAYMENT INTENT
const paymentIntentStatus = pgEnum("product_status", [
  "initiated",
  "processing",
  "completed",
  "failed",
  "canceled",
]);

export const paymentIntent = pgTable("payment_intent", {
  id: text("id").primaryKey(),
  merchantId: text("merchant_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  productId: text("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  customerId: text("customer_id")
    .notNull()
    .references(() => customer.id, { onDelete: "cascade" }),
  customerEmail: text("customer_email"),
  customerWallet: text("customer_wallet"),
  metadata: jsonb("metadata").default("{}"),
  status: paymentIntentStatus("status").notNull().default("initiated"),
  amount: text("amount").notNull(),
  currencyId: text("currency_id")
    .notNull()
    .references(() => currency.id, { onDelete: "restrict" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// PAYMENT LINK
export const paymentLink = pgTable("payment_link", {
  id: text("id").primaryKey(),
  merchantId: text("merchant_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  productId: text("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  url: text("url").notNull().unique(),
  active: boolean("active").notNull().default(true),
  metadata: jsonb("metadata").default("{}"),
  clickCount: text("click_count").notNull().default("0"),
  purchaseCount: text("purchase_count").notNull().default("0"),
  lastVisitedAt: timestamp("last_visited_at"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// TRANSACTION
export const transactionStatus = pgEnum("transaction_status", [
  "created",
  "pending",
  "completed",
  "failed",
  "refunded",
  "canceled",
]);

export const transaction = pgTable("transaction", {
  id: text("id").primaryKey(),
  customerId: text("customer_id")
    .notNull()
    .references(() => customer.id, { onDelete: "cascade" }),
  amount: text("amount").notNull(),
  currencyId: text("currency_id")
    .notNull()
    .references(() => currency.id, { onDelete: "restrict" }),
  status: transactionStatus("status").notNull().default("created"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// webhook Event Types
export const webhookEventType = pgEnum("webhook_event_type", [
  "payment_intent.created",
  "payment_intent.completed",
  "transaction.created",
  "transaction.completed",
  "customer.created",
  "customer.updated",
]);

// webhooks
export const webhook = pgTable("webhook", {
  id: text("id").primaryKey(),
  url: text("url").notNull(),
  eventTypes: webhookEventType("event_types").array().notNull(),
  merchantId: text("merchant_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  secret: text("secret").notNull(), // for validating incoming webhook requests
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

// --- Type inference exports at the bottom ---
export type Verification = typeof verification.$inferInsert;
export type Account = typeof account.$inferInsert;
export type User = typeof user.$inferInsert;
export type Session = typeof session.$inferInsert;
export type Customer = typeof customer.$inferInsert;
export type Product = typeof product.$inferInsert;
export type PaymentIntent = typeof paymentIntent.$inferInsert;
export type PaymentLink = typeof paymentLink.$inferInsert;
export type Transaction = typeof transaction.$inferInsert;
export type Currency = typeof currency.$inferInsert;
export type Webhook = typeof webhook.$inferInsert;
