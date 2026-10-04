const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliDigits(input: number | string): string {
  return String(input).replace(/[0-9]/g, (digit) => bengaliDigits[Number(digit)] || digit);
}

export function formatBanglaDate(dateInput?: string | Date | null): string {
  if (!dateInput) return "";
  try {
    const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    }).format(d);
  } catch {
    return "";
  }
}

export function formatBanglaDateTime(dateInput?: string | Date | null): string {
  if (!dateInput) return "";
  try {
    const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Dhaka",
    }).format(d);
  } catch {
    return "";
  }
}

export function getCurrentBanglaDate(): string {
  return formatBanglaDate(new Date());
}

export function formatByline(byline: unknown): string {
  if (!byline) return "";
  if (typeof byline === "string") return byline;
  if (Array.isArray(byline)) {
    return byline
      .map((item) => {
        if (!item) return "";
        if (typeof item === "string") return item;
        if (typeof item === "object" && "name" in item) {
          const b = item as { name?: string; role?: string | null };
          if (b.role) {
            return `${b.name} (${b.role})`;
          }
          return b.name || "";
        }
        return "";
      })
      .filter(Boolean)
      .join(", ");
  }
  if (typeof byline === "object" && "name" in (byline as Record<string, unknown>)) {
    const b = byline as { name?: string; role?: string | null };
    if (b.role) return `${b.name} (${b.role})`;
    return b.name || "";
  }
  return "";
}
