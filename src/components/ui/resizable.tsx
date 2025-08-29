import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof PanelGroup>) => (
  <PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
);

const ResizablePanel = React.forwardRef<
  React.ElementRef<typeof Panel>,
  React.ComponentProps<typeof Panel>
>(({ className, ...props }, ref) => (
  <Panel ref={ref} className={cn("relative", className)} {...props} />
));
ResizablePanel.displayName = "ResizablePanel";

const ResizableHandle = ({
  className,
  ...props
}: React.ComponentProps<typeof PanelResizeHandle>) => (
  <PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-4 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  ></PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
