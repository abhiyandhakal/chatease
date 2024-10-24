interface MessageBoxProps {
  type: "self" | "other";
  children: React.ReactNode;
}

const MessageBox: React.FC<MessageBoxProps> = ({ type, children }) => {
  return (
    <div className={`w-full flex mt-1 ${type === "self" ? "justify-end" : ""}`}>
      <p
        className={`w-fit py-2 rounded px-4 text-black ${type === "self" ? "bg-blue-400" : "bg-amber-400"}`}
      >
        {children}
      </p>
    </div>
  );
};

export default MessageBox;
