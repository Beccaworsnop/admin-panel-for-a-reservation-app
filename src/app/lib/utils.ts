import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind + conditional classes cleanly.
 * Example:
 * cn("px-2", isActive && "bg-blue-500", "text-sm")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
