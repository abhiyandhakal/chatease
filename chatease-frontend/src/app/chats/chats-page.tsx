"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "./sidebar";
import twConfig from "tailwindcss/resolveConfig";
import config from "../../../tailwind.config";
import ChatSection from "./chat-section";
import Topbar from "./topbar";

export default function ChatsPage() {
  const twConfigLg = twConfig(config).theme.screens.xl;
  const twConfigLgInt = parseInt(twConfigLg.replace("px", ""));
  const isMobile = window.innerWidth < twConfigLgInt;

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={!isMobile ? 20 : undefined}>
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle withHandle className="w-1" />
      <ResizablePanel>
        <Topbar />
        <ChatSection />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
