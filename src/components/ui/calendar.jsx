import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// Optional: Custom styles for dark mode and integration with your theme
import { cn } from "@/lib/utils";

function Calendar({
  mode = "single",
  selected,
  onSelect,
  initialFocus,
  ...props
}) {
  // Focus management for accessibility in modals/popovers
  const ref = React.useRef();
  React.useEffect(() => {
    if (initialFocus && ref.current) {
      ref.current.querySelector("button[tabindex='0']")?.focus();
    }
  }, [initialFocus, selected]);

  return (
    <div ref={ref} className={cn("rdp-root bg-background text-foreground rounded-lg p-2", props.className)}>
      <DayPicker
        mode={mode}
        selected={selected}
        onSelect={onSelect}
        showOutsideDays
        modifiersClassNames={{
          selected: "bg-primary text-primary-foreground",
          today: "border border-primary",
        }}
        classNames={{
          months: "flex flex-col sm:flex-row gap-4",
          month: "space-y-2",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: "h-7 w-7 bg-muted p-0 hover:bg-accent text-accent-foreground rounded-md",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent/20 focus-within:relative focus-within:z-20",
          day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
          day_selected: "bg-primary text-primary-foreground hover:bg-primary/90",
          day_today: "border border-primary",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
        }}
        {...props}
      />
    </div>
  );
}

export { Calendar }; 