import LeftSidebar from "./LeftSidebar";
import ThemeToggler from "../mcsc/ThemeToggler";

const HomeLoggedIn = () => {
  return (
    <main className="flex">
      <LeftSidebar />

      {/* ThemeToggler is just to initialize the colors, hence is hidden */}
      <ThemeToggler className="hidden bg-[var(--bg-primary)]" />
    </main>
  );
};

export default HomeLoggedIn;
