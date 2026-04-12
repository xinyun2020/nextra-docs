import { Drawer } from "vaul";
import { BilibiliIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "./Icons";

export function CustomDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button className="custom-drawer__button font-bold text-xl self-center align-middle">
          More ···
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 dark:bg-zinc-800 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
          <div className="custom-drawer__drawer-content p-4 bg-white dark:bg-zinc-900 rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600 mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="custom-drawer__drawer-title font-medium mb-4 text-center text-zinc-900 dark:text-zinc-100">
                Seems like you want to know more about me 🎉
              </Drawer.Title>
              <div className="custom-drawer__drawer-body">
                <div className="custom-drawer__button-group flex flex-row pb-12 items-center justify-center gap-4">
                  <YoutubeIcon />
                  <TwitterIcon />
                  <BilibiliIcon />
                  <InstagramIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="custom-drawer__footer p-4 bg-zinc-100 dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 mt-auto">
            <div className="flex gap-6 justify-center max-w-md mx-auto">
              <a
                className="text-xs text-zinc-600 dark:text-zinc-300 flex items-center gap-0.25"
                href="https://github.com/XinYun2020"
                target="_blank">
                GitHub
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="16"
                  aria-hidden="true"
                  className="w-3 h-3 ml-1">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </a>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
