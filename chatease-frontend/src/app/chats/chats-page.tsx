"use client";

import ChateaseSidebar from "./sidebar";
import ChatSection from "./chat-section";
import Topbar from "./topbar";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { CollapsibleContent, Collapsible } from "@/components/ui/collapsible";

export default function ChatsPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarProvider
      defaultOpen={true}
      className="w-full"
      style={{ "--sidebar-width": "24rem" } as React.CSSProperties}
    >
      <Sidebar side="left" className="border-r h-full">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="space-y-2 h-full"
        >
          <CollapsibleContent className="space-y-2 h-full">
            <ChateaseSidebar />
          </CollapsibleContent>
        </Collapsible>
      </Sidebar>
      <div className="w-full h-screen overflow-y-hidden">
        <Topbar />
        <ChatSection />
      </div>
    </SidebarProvider>
  );
}
