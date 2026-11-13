import type Atlanta from "../base/Atlanta.js";
export declare function sortByKey<T>(array: T[], key: keyof T): T[];
export declare function shuffle<T>(arr: T[]): T[];
export declare function randomNum(min: number, max: number): number;
export declare function convertTime(translate: (key: string, args?: Record<string, unknown>) => string, timeMs: number): string;
export declare function supportLink(client: Atlanta): Promise<string>;
//# sourceMappingURL=functions.d.ts.map