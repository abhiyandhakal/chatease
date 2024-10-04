"use client";
import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";

function Textbox({
  handleSubmit,
  input,
  setInput,
}: {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}) {
  return (
    <form className="w-full mt-2 flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        className="bg-slate-400 text-black p-2 rounded w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-black bg-cyan-400 w-fit px-4 rounded"
      >
        Enter
      </button>
    </form>
  );
}

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

export default function Home() {
  const id = useMemo(() => Date.now().toString(), []);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<
    { id: string; message: string; time: number }[]
  >([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:4000/ws?id=" + id);

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      console.log(event.data);
      setMessages(JSON.parse(event.data));
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      newSocket.close();
    };
  }, [id]);

  const handleTextSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message: input }));
      setInput("");
    }
  };

  return (
    <div className="p-4 bg-slate-500 h-screen">
      <div className="bg-slate-700 shadow-xl shadow-gray-700 h-full w-full rounded-lg flex flex-col justify-end p-3">
        {messages.map((message, index) => (
          <MessageBox key={index} type={message.id === id ? "self" : "other"}>
            {message.message}
          </MessageBox>
        ))}
        <Textbox
          handleSubmit={handleTextSubmit}
          input={input}
          setInput={setInput}
        />
      </div>
    </div>
  );
}
