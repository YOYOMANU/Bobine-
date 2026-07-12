"use client";

import { useEffect, useState } from "react";
import FormWatch from "./components/form-watch";
import { Toaster } from "@/components/ui/sonner";
import { Category, Tier, WatchItem } from "@/types";
import { getCategories, getTiers, getWatchItem } from "@/lib/actions";
import { Stats } from "./components/render-stats";
import { WatchlistBoard } from "./components/watch-list-board";

export default function Home() {

  return (
    <div className="app">
      <WatchlistBoard />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
