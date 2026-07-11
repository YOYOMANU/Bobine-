"use client";

import { useEffect, useState } from "react";
import FormWatch from "./components/form-watch";
import { Toaster } from "@/components/ui/sonner";
import { Category, Tier, WatchItem } from "@/types";
import { getCategories, getTiers, getWatchItem } from "@/lib/actions";
import { Stats } from "./components/render-stats";
import { WatchlistBoard } from "./components/watch-list-board";

export default function Home() {

  const [categories, setCategories] = useState<Category[]>([]);
  const [watchItems, setWatchItems] = useState<WatchItem[]>([]);
  const [tiers, setTiers] = useState<Tier[]>([]);

  const load = async () => {
    const items = await getWatchItem();
    setWatchItems(items);
  };

  useEffect(() => {
    load()
  }, []);



  return (
    <div className="app">
      <WatchlistBoard />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
