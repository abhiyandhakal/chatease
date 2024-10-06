CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`profilePic` text,
	`createdAt` text NOT NULL,
	`updatedAt` text
);
