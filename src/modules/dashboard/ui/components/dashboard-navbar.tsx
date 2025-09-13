"use client"

import { useEffect, useState } from "react"
import { DashboardCommand } from "./dashboard-command"
import { Button } from "@/components/ui/button"
import { PanelLeftIcon, PanelLeftCloseIcon, SearchIcon } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

export const DashboardNavbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar()
    const [commandOpen, setCommandOpen] = useState(false)

    // Move platform detection outside so it's accessible in JSX
    const isMac = typeof navigator !== "undefined" && navigator.platform.toUpperCase().includes("MAC")

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
        if ((isMac ? e.metaKey : e.ctrlKey) && (isMac ? e.key.toLowerCase() === "k" : e.key === "/")) {
            e.preventDefault()
            setCommandOpen(open => !open)
        }
        }

        window.addEventListener("keydown", down)
        return () => window.removeEventListener("keydown", down)
    }, [isMac])

    return (
        <>
        <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
        <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
            <Button className="size-9" variant="outline" onClick={toggleSidebar}>
            {(state === "collapsed" || isMobile)
                ? <PanelLeftIcon className="size-4" />
                : <PanelLeftCloseIcon className="size-4" />}
            </Button>

            <Button
            className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
            variant="outline"
            size="sm"
            onClick={() => setCommandOpen(open => !open)}
            >
            <SearchIcon className="mr-2 h-4 w-4" />
            Search
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted 
                px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-sm">{isMac ? "⌘" : "Ctrl"}</span>
                {isMac ? "K" : "/"}
            </kbd>
            </Button>
        </nav>
        </>
    )
}


