"use client";

import { useEffect } from "react";

interface KeyboardNavHandlers {
	onAbout?: () => void;
	onWork?: () => void;
	onContact?: () => void;
	onHelp?: () => void;
}

function isTypingTarget(target: EventTarget | null): boolean {
	if (!(target instanceof HTMLElement)) return false;
	const tag = target.tagName;
	return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

export function useKeyboardNav({ onAbout, onWork, onContact, onHelp }: KeyboardNavHandlers) {
	useEffect(() => {
		function handle(event: KeyboardEvent) {
			if (event.metaKey || event.ctrlKey || event.altKey) return;
			if (isTypingTarget(event.target)) return;

			switch (event.key) {
				case "1":
					event.preventDefault();
					onAbout?.();
					break;
				case "2":
					event.preventDefault();
					onWork?.();
					break;
				case "3":
					event.preventDefault();
					onContact?.();
					break;
				case "?":
					event.preventDefault();
					onHelp?.();
					break;
			}
		}

		window.addEventListener("keydown", handle);
		return () => window.removeEventListener("keydown", handle);
	}, [onAbout, onWork, onContact, onHelp]);
}
