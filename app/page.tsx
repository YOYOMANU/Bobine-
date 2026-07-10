"use client";

import FormWatch from "./components/form-watch";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <div className="app">
      {/* <FormWatch /> */}
      <Toaster position="bottom-left" />
    </div>
  );
}
