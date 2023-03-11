DROP TABLE IF EXISTS "users_info";
CREATE TABLE "users_info" (
  "username" varchar PRIMARY KEY,
  "fullname" varchar,
  "address1" varchar,
  "address2" varchar,
  "city" varchar,
  "state" char(2),
  "zipcode" int
);

DROP TABLE IF EXISTS "order_history";
CREATE TABLE "order_history" (
  "username" varchar PRIMARY KEY,
  "purchase_date" date,
  "delivery_date" date,
  "delivery_address" varchar,
  "unit_cost" decimal(10,2),
  "gallons_amount" int,
  "total_cost" decimal(255,2)
);

DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
  "username" varchar PRIMARY KEY,
  "password" varchar
);

ALTER TABLE "users_info" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

ALTER TABLE "order_history" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");
