import { User } from "@/types";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

const LoginForm = () => {
	const [btnText, setBtnText] = useState("Send Sign In Link");
	const [error, setError] = useState(false);

	useEffect(() => {
		if (btnText !== "Send Sign In Link") setError(true);
	}, [btnText]);

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let textboxValue = e.currentTarget.email.value as string;

		setBtnText("Sending...");

		const res = await axios.get("/api/users");

		const users: User[] = res.data.data;

		const user: User | undefined = users.filter(
			(user) => user.email === textboxValue
		)[0];

		if (!user) setBtnText("User not found");
		else if (!user?.emailVerified) setBtnText("Email not verified");
		else signIn("email", { email: textboxValue });

		// signIn("email", {
		// 	email: textboxValue,
		// });
	};

	return (
		<form
			className="mx-auto grid h-fit w-full max-w-xl gap-3 rounded-3xl bg-[var(--bg-secondary)] p-12 shadow-lg lg:mx-0"
			onSubmit={submitHandler}
		>
			<h2 className="text-center text-2xl font-extrabold">Log In</h2>

			<div className="textbox-container">
				<label htmlFor="login-email" className="textbox-label">
					Email or Username
				</label>
				<input
					placeholder="Username"
					id="login-email"
					type="email"
					name="email"
					className="textbox"
					required
				/>
			</div>

			<button
				className={`button transition ${
					!error ? "bg-[var(--button-bg)]" : "bg-red-700"
				}`}
				type="submit"
			>
				{btnText}
			</button>
		</form>
	);
};

export default LoginForm;
