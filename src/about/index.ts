import ico_seele from "./@seele.png"
import ico_zhou from "./@zhou.png"
import icon_mail from "@primer/octicons/build/svg/mail.json"
import icon_mark_github from "@primer/octicons/build/svg/mark_github.json"
import type { DefaultTheme } from "vitepress/theme"
import type { Language } from "../../.vitepress/config"

const title = {
	bot: (_lang) => "Bot",
	dev: (_lang) => "Developer",
} as const satisfies Record<string, (_: Language) => string>

export const core = (lang: Language): DefaultTheme.TeamMember[] => [
	{
		avatar: ico_zhou,
		name: "Heptazhou",
		title: title.dev(lang),
		links: [
			{ icon: { svg: icon_mark_github }, link: "https://github.com/Heptazhou" },
			{ icon: { svg: icon_mail }, link: "mailto:zhou@0h7z.com" },
		],
	},
	{
		avatar: ico_seele,
		name: "Seele",
		title: title.bot(lang),
		links: [
			{ icon: { svg: icon_mark_github }, link: "https://github.com/seelebot" },
			// { icon: { svg: icon_mail }, link: "mailto:seele@0h7z.com" },
		],
	},
]

export const extra = (_lang: Language): DefaultTheme.TeamMember[] => []
