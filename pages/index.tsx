import { useSession } from "next-auth/react";
import Head from "next/head";
import HomeLoggedIn from "../components/home-logged-in/HomeLoggedIn";
import Landing from "../components/landing/Landing";

const Home = () => {
	const { data: session } = useSession();

	return (
		<>
			<Head>
				<title>ChatEase</title>
				<meta name="description" content="ChatEase: A chat app" />
			</Head>
			{session ? <HomeLoggedIn /> : <Landing />}
		</>
	);
};

export default Home;
