interface MessageBoxProps {
  type: "self" | "other";
  children: React.ReactNode;
  createdAt: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  type,
  createdAt,
  children,
}) => {
  return (
    <div
      className={`w-full flex mt-1 items-center gap-2 ${type === "self" ? "justify-end" : ""}`}
      onMouseEnter={(e) => {
        const date = e.currentTarget.querySelector(".date");
        if (date) {
          date.classList.remove("hidden");
        }
      }}
      onMouseLeave={(e) => {
        const date = e.currentTarget.querySelector(".date");
        if (date) {
          date.classList.add("hidden");
        }
      }}
    >
      <span className={"date text-muted-foreground hidden "}>
        {new Date(createdAt).toLocaleString()}
      </span>
      <p
        className={`w-fit py-2 rounded px-4 text-black ${type === "self" ? "bg-blue-400" : "bg-amber-400"}`}
      >
        {children}
      </p>
    </div>
  );
};

export default MessageBox;
