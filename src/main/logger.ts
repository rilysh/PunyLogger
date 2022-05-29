import { appendFile } from "node:fs/promises";
import { stdout } from "node:process";
import type { Options } from "../@typings/types";

export default class PunyLogger {
    public logFileName?: string;

    public enableColorLogs: boolean;

    public writeOnFile: boolean;

    public infoColor: string;

    public debugColor: string;

    public warnColor: string;

    public errorColor: string;

    public successColor: string;

    public enableTimestamp: boolean;

    public okColor: string;

    constructor(options?: Options) {
        this.enableColorLogs = options?.enableColorLogs ?? true;
        this.enableTimestamp = options?.enableTimestamp ?? false;
        this.writeOnFile = options?.writeOnFile ?? false;
        if (this.writeOnFile) {
            this.logFileName = options?.logFileName ?? `./log-${new Date(Date.now()).toLocaleDateString().replaceAll("/", "-")}.log`;
        }
        this.infoColor = options?.infoColor ?? "\x1b[97m";
        this.debugColor = options?.debugColor ?? "\x1b[94m";
        this.warnColor = options?.warnColor ?? "\x1b[93m";
        this.errorColor = options?.errorColor ?? "\x1b[91m";
        this.successColor = options?.successColor ?? "\x1b[92m";
        this.okColor = options?.okColor ?? this.successColor;
    }

    private async writeLogs(data?: string): Promise<void> {
        // eslint-disable-next-line newline-per-chained-call
        await appendFile(this.logFileName!, `\n${data === undefined || data === null ? "null or undefined data passed." : data.replaceAll("[0m", "").replaceAll("", "\x1b").replaceAll(this.debugColor, "").replaceAll(this.warnColor, "").replaceAll(this.errorColor, "").replaceAll(this.successColor, "").replaceAll(this.okColor, "")}`);
    }

    private makeLogs(text: string): void {
        stdout.write(`${text}\n`);
        if (this.writeOnFile) {
            this.writeLogs(text);
        }
    }

    public getTime(): string {
        return new Date(Date.now()).toLocaleTimeString().replaceAll(":", ".");
    }

    public info(message: string): void {
        this.makeLogs(`${this.enableColorLogs ? this.infoColor : ""}[ Info${this.enableTimestamp ? `: ${this.getTime()}` : ""} ] ${message}${this.enableColorLogs ? "\x1b[0m" : ""}`);
    }

    public debug(message: string): void {
        this.makeLogs(`${this.enableColorLogs ? this.debugColor : ""}[ Debug${this.enableTimestamp ? `: ${this.getTime()}` : ""} ] ${message}${this.enableColorLogs ? "\x1b[0m" : ""}`);
    }

    public warn(message: string): void {
        this.makeLogs(`${this.enableColorLogs ? this.warnColor : ""}[ Warn${this.enableTimestamp ? `: ${this.getTime()}` : ""} ] ${message}${this.enableColorLogs ? "\x1b[0m" : ""}`);
    }

    public error(message: string): void {
        this.makeLogs(`${this.enableColorLogs ? this.errorColor : ""}[ Error${this.enableTimestamp ? `: ${this.getTime()}` : ""} ] ${message}${this.enableColorLogs ? "\x1b[0m" : ""}`);
    }

    public success(message: string): void {
        this.makeLogs(`${this.enableColorLogs ? this.successColor : ""}[ Success${this.enableTimestamp ? `: ${this.getTime()}` : ""} ] ${message}${this.enableColorLogs ? "\x1b[0m" : ""}`);
    }

    public ok(message: string): void {
        this.makeLogs(`${this.enableColorLogs ? this.okColor : ""}[ OK${this.enableTimestamp ? `: ${this.getTime()}` : ""} ] ${message}${this.enableColorLogs ? "\x1b[0m" : ""}`);
    }
}
