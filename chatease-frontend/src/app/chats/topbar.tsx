"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ChatSection from "./chat-section";

export default function Topbar() {
  return (
    <SidebarProvider defaultOpen={false} className="w-full">
      <div className="w-full">
        <div className="border h-10 shadow w-full flex items-center justify-end px-5">
          <SidebarTrigger className="rotate-180" />
        </div>
        <ChatSection />
      </div>
      <div className="flex min-h-screen">
        <Sidebar side="right" className="border-l">
          <SidebarHeader className="border-b p-4">
            <h2 className="font-semibold">Details</h2>
          </SidebarHeader>
          <SidebarContent></SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
