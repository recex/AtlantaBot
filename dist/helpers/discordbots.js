import { Api } from "@top-gg/sdk";
export function initDBLStats(client) {
    if (!client.config.apiKeys.dbl)
        return;
    try {
        const api = new Api(client.config.apiKeys.dbl);
        setInterval(() => {
            api.postStats({
                serverCount: client.guilds.cache.size,
            }).catch(() => { });
        }, 60000 * 10);
    }
    catch {
        client.logger.log("Failed to initialize top.gg integration", "warn");
    }
}
//# sourceMappingURL=discordbots.js.map