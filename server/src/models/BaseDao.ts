// base.dao.ts
import { PrismaClient } from "@prisma/client";
import { isValid as ulidValidate } from "ulid";
import { d, empty, logError, logSuccess, newULID } from "@utils";
import prisma from "../prisma";

export default class BaseDao {
  protected static prisma: PrismaClient;
  protected static modelName: string; // each subclass declares its own

  static async init(prisma: PrismaClient) {
    await prisma.$connect();
    if (!prisma) throw new Error("[BaseDao] Prisma instance is required");
    BaseDao.prisma = prisma;
    logSuccess("[BaseDao] ✅ Prisma initialized successfully");
  }

  // ✅ static getter — accessible as this.repository or SubClass.repository
  protected static get repository() {
    if (!BaseDao.prisma) {
      throw new Error(
        "[BaseDao] Prisma not initialized. Call BaseDao.init(prisma) first!",
      );
    }
    // ✅ `this.modelName` resolves to the *subclass* value, not BaseDao's
    const repo = (BaseDao.prisma as any)[(this as typeof BaseDao).modelName];
    if (!repo) {
      throw new Error(
        `[BaseDao] Model "${(this as typeof BaseDao).modelName}" not found in Prisma Client`,
      );
    }
    return repo;
  }

  // ==================== HELPERS ====================
  static paginationOptions = {
    limit: 10,
    order: { createdAt: "desc" },
    page: 1,
  };

  static formatPage({ docs, totalDocs, page, limit }: any) {
    return {
      total: totalDocs,
      pages: Math.ceil(totalDocs / limit),
      current: page,
      records: docs,
    };
  }

  static normalizeQuery(query: any): any {
    if (empty(query) || typeof query !== "object" || Array.isArray(query)) {
      return query;
    }

    const normalized: any = {};

    for (const key in query) {
      const val = query[key];

      if (val === undefined) continue;

      if (key === "$or" && Array.isArray(val)) {
        normalized.OR = val.map((item: any) => this.normalizeQuery(item));
        continue;
      }

      if (key === "$and" && Array.isArray(val)) {
        normalized.AND = val.map((item: any) => this.normalizeQuery(item));
        continue;
      }

      if (key === "$not" && typeof val === "object") {
        normalized.NOT = this.normalizeQuery(val);
        continue;
      }

      if (key.includes(".")) {
        const [relation, field] = key.split(".");

        if (val && typeof val === "object" && !Array.isArray(val)) {
          if ("$search" in val || "$contains" in val) {
            const searchValue = val.$search || val.$contains;

            normalized[relation] = {
              is: {
                [field]: {
                  contains: searchValue,
                  mode: "insensitive" as const,
                },
              },
            };
            continue;
          }

          if ("$startsWith" in val) {
            normalized[relation] = {
              is: {
                [field]: {
                  startsWith: val.$startsWith,
                  mode: "insensitive" as const,
                },
              },
            };
            continue;
          }

          if ("$endsWith" in val) {
            normalized[relation] = {
              is: {
                [field]: {
                  endsWith: val.$endsWith,
                  mode: "insensitive" as const,
                },
              },
            };
            continue;
          }

          normalized[relation] = {
            is: {
              [field]: this.normalizeQuery(val),
            },
          };
          continue;
        }
      }

      if (val && typeof val === "object" && !Array.isArray(val)) {
        if ("$ne" in val) {
          normalized[key] = { not: val.$ne };
        } else if ("$in" in val) {
          normalized[key] = { in: val.$in };
        } else if ("$nin" in val) {
          normalized[key] = { notIn: val.$nin };
        } else if ("$gt" in val) {
          normalized[key] = { gt: val.$gt };
        } else if ("$gte" in val) {
          normalized[key] = { gte: val.$gte };
        } else if ("$lt" in val) {
          normalized[key] = { lt: val.$lt };
        } else if ("$lte" in val) {
          normalized[key] = { lte: val.$lte };
        } else if ("$search" in val || "$contains" in val) {
          const searchValue = val.$search || val.$contains;
          normalized[key] = {
            contains: searchValue,
            mode: "insensitive" as const,
          };
        } else if ("$startsWith" in val) {
          normalized[key] = {
            startsWith: val.$startsWith,
            mode: "insensitive" as const,
          };
        } else if ("$endsWith" in val) {
          normalized[key] = {
            endsWith: val.$endsWith,
            mode: "insensitive" as const,
          };
        } else if ("$not" in val) {
          normalized[key] = { not: this.normalizeQuery(val.$not) };
        } else if ("$exists" in val) {
          normalized[key] = val.$exists ? { not: null } : { equals: null };
        } else if ("$elemMatch" in val) {
          normalized[key] = { some: this.normalizeQuery(val.$elemMatch) };
        } else {
          normalized[key] = this.normalizeQuery(val);
        }
      } else {
        normalized[key] = val;
      }
    }

    return normalized;
  }
  // ==================== CRUD ====================
  static async create(data: any, tx?: any, options?: any) {
    try {
      const repo = tx ? tx[this.modelName] : this.repository;
      return await repo.create({ data, ...options });
    } catch (e) {
      logError(e, "[BASE-DAO-CREATE]");
      return null;
    }
  }

  static async insertMany(data: any[]) {
    try {
      for (const r of data) if (!r.id) r.id = newULID();
      return await this.repository.createMany({
        data,
        skipDuplicates: true,
      });
    } catch (e) {
      logError(e, "[BASE-DAO-INSERT-MANY]");
      return null;
    }
  }

  static async updateMany(where: any = {}, data: any = {}) {
    try {
      const result = await this.repository.updateMany({
        where: BaseDao.normalizeQuery(where),
        data,
      });
      return result.count;
    } catch (e) {
      logError(e, "[BASE-DAO-UPDATE-MANY]");
      return null;
    }
  }

  static async findByIdAndUpdate(
    id: string,
    data: any = {},
    tx?: any,
    options: any = {},
  ) {
    try {
      // if (empty(id) || !ulidValidate(id)) throw new Error("Invalid ID");
      const repo = tx ? tx[this.modelName] : this.repository;
      await repo.update({ where: { id }, data, ...options });
      return await repo.findUnique({ where: { id }, ...options });
    } catch (e) {
      logError(e, "[BASE-DAO-FIND-BY-ID-AND-UPDATE]");
      return null;
    }
  }

  static async findById(id: string, tx?: any, options: any = {}) {
    try {
      // if (empty(id) || !ulidValidateid)) throw new Error("Invalid ID");
      const repo = tx ? tx[this.modelName] : this.repository;
      return await repo.findUnique({ where: { id }, ...options });
    } catch (e) {
      logError(e, "[BASE-DAO-FIND-BY-ID]");
      return null;
    }
  }

  static async findOne(query: any = {}, options: any = {}) {
    try {
      return await this.repository.findFirst({
        where: BaseDao.normalizeQuery(query),
        ...options,
      });
    } catch (e) {
      logError(e, "[BASE-DAO-FIND-ONE]");
      return null;
    }
  }

  static async find(query: any = {}, options: any = {}) {
    try {
      return await this.repository.findMany({
        where: BaseDao.normalizeQuery(query),
        ...options,
      });
    } catch (e) {
      logError(e, "[BASE-DAO-FIND]");
      return null;
    }
  }

  static async deleteMany(where: any = {}) {
    try {
      const result = await this.repository.deleteMany({
        where: BaseDao.normalizeQuery(where),
      });
      return result.count;
    } catch (e) {
      logError(e, "[BASE-DAO-DELETE-MANY]");
      return null;
    }
  }

  static async findByIdAndDelete(id: string) {
    try {
      // if (empty(id) || !ulidValidate(id)) throw new Error("Invalid ID");
      const data = await BaseDao.findById(id);
      await this.repository.delete({ where: { id } });
      return data;
    } catch (e) {
      logError(e, "[BASE-DAO-FIND-BY-ID-AND-DELETE]");
      return null;
    }
  }

  static async count(where: any = {}) {
    try {
      return await this.repository.count({
        where: BaseDao.normalizeQuery(where),
      });
    } catch (e) {
      logError(e, "[BASE-DAO-COUNT]");
      return null;
    }
  }

  // ==================== PAGINATION ====================
  static async paginate(query: any = {}, options: any = {}) {
    console.log("options: ", options);
    try {
      const page = options.page || 1;
      const limit = options.limit || 10;
      const skip = (page - 1) * limit;

      const docs = await this.repository.findMany({
        where: BaseDao.normalizeQuery(query),
        skip,
        take: limit,
        orderBy: options.order || { createdAt: "desc" },
      });

      const totalDocs = await this.repository.count({
        where: BaseDao.normalizeQuery(query),
      });

      return this.formatPage({ docs, totalDocs, page, limit });
    } catch (e) {
      logError(e, "[BASE-DAO-PAGINATE]");
      return null;
    }
  }
}
