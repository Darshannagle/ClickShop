import { PrismaClient } from "@prisma/client";

// Helpers
import { d, logSuccess, logWarn, logError, getError } from "@utils";

// Others
import Config from "@config";

//--------------------------------------------------------------
export default class DatabaseHandler {
  static prisma: PrismaClient | null = null;

  static async connect(cb: () => void): Promise<void> {
    try {
      // If already initialized
      if (this.prisma) {
        logWarn(`[DATABASE] - Prisma client is already initialized`);
        return cb();
      }

      // Create Prisma Client with configuration
      this.prisma = new PrismaClient({
        datasources: {
          //   db: {
          //     url: `postgresql://${Config.DATABASE.USERNAME}:${Config.DATABASE.PASSWORD}@${Config.DATABASE.HOST}:${Config.DATABASE.PORT}/${Config.DATABASE.DATABASE}`,
          //   },
        },
        log: [
          { level: "warn", emit: "event" },
          { level: "error", emit: "event" },
        ],
      });

      // Optional: Listen to events
      this.prisma.$on("warn", (e: any) => logWarn(`[PRISMA] ${e.message}`));
      this.prisma.$on("error", (e: any) => logError(`[PRISMA] ${e.message}`));

      // Connect explicitly
      await this.prisma.$connect();

      logSuccess(`[DATABASE] - Prisma connected to PostgreSQL`);
      cb();
    } catch (e) {
      logError(`[DATABASE] - ${getError(e)}`);
      throw e;
    }
  }

  static async disconnect(): Promise<void> {
    if (this.prisma) {
      await this.prisma.$disconnect();
      this.prisma = null;
      logSuccess(`[DATABASE] - Prisma disconnected`);
    }
  }
}
