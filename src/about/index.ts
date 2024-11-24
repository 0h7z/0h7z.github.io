import { DefaultTheme } from "vitepress/theme"
import icon from "@primer/octicons/svg.json"
import type { Language } from "../../.vitepress/config"

const title = {
	bot: (_lang) => "Bot",
	dev: (_lang) => "Developer",
} satisfies Record<string, (_: Language) => string>

export const core = (lang: Language): DefaultTheme.TeamMember[] => [
	{
		avatar: "https://github.com/Heptazhou.png",
		name: "Heptazhou",
		title: title.dev(lang),
		links: [
			{ icon: { svg: icon.mark_github }, link: "https://github.com/Heptazhou" },
			{ icon: { svg: icon.mail }, link: "mailto:zhou@0h7z.com" },
		],
	},
	{
		avatar: "https://github.com/seelebot.png",
		name: "Seele",
		title: title.bot(lang),
		links: [
			{ icon: { svg: icon.mark_github }, link: "https://github.com/seelebot" },
			// { icon: { svg: icon.mail }, link: "mailto:seele@0h7z.com" },
		],
	},
]

export const extra = (_lang: Language): DefaultTheme.TeamMember[] => []
