const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="absolute z-10 -translate-y-full bg-[var(--button-bg)] py-3 px-6 text-xl text-[var(--button-clr)] transition-transform focus:translate-y-0"
      role={"skip-to-content"}
    >
      <span className="sr-only">Skip To Content</span>
      Skip To Content
    </a>
  );
};

export default SkipToContent;
