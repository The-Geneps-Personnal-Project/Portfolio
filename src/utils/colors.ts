export const colors = {
    red: "\x1B[1;3;31m",
    green: "\x1B[1;3;32m",
    blue: "\x1B[1;3;34m",
    reset: "\x1B[0m",
    pink: "\x1B[1;3;35m",
};

export function replaceColors(text: string) {
    return text
        .replaceAll("{{red}}", colors.red)
        .replaceAll("{{green}}", colors.green)
        .replaceAll("{{blue}}", colors.blue)
        .replaceAll("{{reset}}", colors.reset)
        .replaceAll("{{pink}}", colors.pink);
}
