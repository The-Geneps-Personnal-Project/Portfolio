export function getProjects() {
    return [
        {
            name: "ScrapTS",
            description:
                "A web scraper built with TypeScript and Puppeteer. It allows everyday to scraps new chapters of webtoons/manga/manhwa ... depending on a given list of names.",
            techStack: ["Puppeteer", "TypeScript", "Sqlite3", "Express", "DiscordJS"],
            github: [
                "https://github.com/The-Geneps-Personnal-Project/ScrapBot",
                "https://github.com/The-Geneps-Personnal-Project/ScrapAPI",
            ],
        },
        {
            name: "ZenScript",
            description: "A simple scripting language interpreter built with TypeScript. It allows to run scripts written in ZenScript.",
            techStack: ["TypeScript"],
            github: ["https://github.com/The-Geneps-Personnal-Project/ZenScript"],
        },
        {
            name: "Portfolio",
            description:
                "My portfolio website built with React. It is a terminal emulator that displays information about me and my projects.",
            techStack: ["React", "TypeScript"],
            github: [""],
        },
        {
            name: "EpiHunt",
            description:
                "A discord bot made for the school Epitech that allows user to participage in a large scale game of QR code hunting containing enigmas.",
            techStack: ["DiscordJS", "TypeScript"],
            github: ["https://github.com/The-Geneps-Personnal-Project/EpiHunt"],
        },
    ];
}
