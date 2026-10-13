export const tagColor: Record<string, string> = {
	rust: "text-tag-rust",
	typescript: "text-tag-ts",
	wasm: "text-tag-wasm",
	infra: "text-cyan",
	proxmox: "text-orange-400",
	Go: "text-[#00ADD8]"
};

export function tagClass(tag: string): string {
	return tagColor[tag] ?? "text-muted";
}
