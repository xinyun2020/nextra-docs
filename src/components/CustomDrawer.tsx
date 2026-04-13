import { useState } from "react";
import { Drawer } from "vaul";
import { BilibiliIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "./Icons";
import { MY } from "@/constants";
import Projects from "./Projects/Projects";

export function CustomDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button className="custom-drawer__button font-bold text-xl self-center align-middle rounded-lg px-4 py-2 hover:bg-slate-500/10 transition-colors focus-visible:ring-2 focus-visible:ring-[#0AAFCE]" aria-label="Show social links">
          More ···
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 dark:bg-zinc-800 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
          <div className="custom-drawer__drawer-content p-4 bg-white dark:bg-zinc-900 rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600 mb-8" />
            <div className="max-w-2xl mx-auto">
              <Drawer.Title className="custom-drawer__drawer-title font-medium mb-4 text-center text-zinc-900 dark:text-zinc-100">
                A bit more about me.
              </Drawer.Title>
              <div className="custom-drawer__drawer-body">
                <div className="custom-drawer__button-group flex flex-row pb-6 items-center justify-center gap-4">
                  <a style={{ padding: "0.5rem" }} href={MY.linkedin} target="_blank" rel="nofollow noreferrer" aria-label="LinkedIn" className="hover:text-[#0A66C2] duration-200">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <YoutubeIcon />
                  <TwitterIcon />
                  <BilibiliIcon />
                  <InstagramIcon />
                </div>
                {open && (
                  <div className="pt-2 pb-6 min-h-[160px]">
                    <Projects />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="custom-drawer__footer p-4 bg-zinc-100 dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 mt-auto" />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
