CREATE TABLE `dmChannel` (
	`id` text PRIMARY KEY NOT NULL,
	`senderId` text NOT NULL,
	`receiverId` text NOT NULL,
	FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`receiverId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
