CREATE TABLE IF NOT EXISTS "groups" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"createdBy" text NOT NULL,
	"createdAt" text NOT NULL,
	"updatedAt" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messsages" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"senderId" text NOT NULL,
	"createdAt" text NOT NULL,
	"updatedAt" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directMessage" (
	"id" text PRIMARY KEY NOT NULL,
	"channelId" text NOT NULL,
	"messageId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dmChannel" (
	"id" text PRIMARY KEY NOT NULL,
	"senderId" text NOT NULL,
	"receiverId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groupHasMessage" (
	"id" text PRIMARY KEY NOT NULL,
	"groupId" text NOT NULL,
	"messageId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userInGroup" (
	"id" text PRIMARY KEY NOT NULL,
	"groupId" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"fullName" text NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"profilePic" text,
	"createdAt" text NOT NULL,
	"updatedAt" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groups" ADD CONSTRAINT "groups_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messsages" ADD CONSTRAINT "messsages_senderId_users_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directMessage" ADD CONSTRAINT "directMessage_channelId_dmChannel_id_fk" FOREIGN KEY ("channelId") REFERENCES "public"."dmChannel"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directMessage" ADD CONSTRAINT "directMessage_messageId_messsages_id_fk" FOREIGN KEY ("messageId") REFERENCES "public"."messsages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dmChannel" ADD CONSTRAINT "dmChannel_senderId_users_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dmChannel" ADD CONSTRAINT "dmChannel_receiverId_users_id_fk" FOREIGN KEY ("receiverId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groupHasMessage" ADD CONSTRAINT "groupHasMessage_groupId_groups_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groupHasMessage" ADD CONSTRAINT "groupHasMessage_messageId_messsages_id_fk" FOREIGN KEY ("messageId") REFERENCES "public"."messsages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userInGroup" ADD CONSTRAINT "userInGroup_groupId_groups_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userInGroup" ADD CONSTRAINT "userInGroup_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
