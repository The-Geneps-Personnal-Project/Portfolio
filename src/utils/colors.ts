export const colors = {
    red: "\x1B[1;3;31m",
    green: "\x1B[1;3;32m",
    blue: "\x1B[1;3;34m",
    reset: "\x1B[0m",
    pink: "\x1B[1;3;35m",
};

export function replaceColors(text:string) {
    return text
        .replace('{{red}}', colors.red)
        .replace('{{green}}', colors.green)
        .replace('{{blue}}', colors.blue)
        .replace('{{reset}}', colors.reset)
        .replace('{{pink}}', colors.pink);
}
