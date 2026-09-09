"use client";

import { Icon as Iconify, type IconProps } from "@iconify/react";

// Thin wrapper over @iconify/react so components can keep using Iconify names
// exactly as in the old Astro site (e.g. "lucide:mail", "simple-icons:react").
// Skill/project icons come from the API as these name strings, so a name-based
// icon system is required.
export function Icon(props: IconProps) {
	return <Iconify {...props} />;
}
