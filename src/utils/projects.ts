import { ExtendedTerminal } from "../types/extendedTerminal";

export function getProjects(term: ExtendedTerminal) {
    return [
        {
            name: "ScrapTS",
            description: `${term.translate("projects.scrap")}`,
            techStack: ["Puppeteer", "TypeScript", "Sqlite3", "Express", "DiscordJS"],
            github: [
                "https://github.com/The-Geneps-Personnal-Project/ScrapBot",
                "https://github.com/The-Geneps-Personnal-Project/ScrapAPI",
            ],
        },
        {
            name: "ZenScript",
            description: `${term.translate("projects.zenscript")}`,
            techStack: ["TypeScript"],
            github: ["https://github.com/The-Geneps-Personnal-Project/ZenScript"],
        },
        {
            name: "Portfolio",
            description: `${term.translate("projects.portfolio")}`,
            techStack: ["React", "TypeScript"],
            github: ["https://github.com/The-Geneps-Personnal-Project/ZenPortfolio"],
        },
        {
            name: "EpiHunt",
            description: `${term.translate("projects.epihunt")}`,
            techStack: ["DiscordJS", "TypeScript"],
            github: ["https://github.com/The-Geneps-Personnal-Project/EpiHunt"],
        },
    ];
}
