import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Get all model names as union type
export type ModelName = Prisma.ModelName; // "User" | "Post" | "Order" ...

// Get list of model names as array (runtime)
export const modelNames: ModelName[] = Object.values(Prisma.ModelName);

// Or dynamically extract (clean way)
export type ModelNames = keyof {
  [K in keyof PrismaClient as K extends `$${string}`
    ? never
    : K extends string
      ? K
      : never]: PrismaClient[K];
};

// const getModels = () => {
//   const schema = fs.readFileSync("./prisma/schema.prisma", "utf-8");
//   const schemas = PrismaAST.getSchema(schema);

//   const models = [];
//   schemas.list.forEach((item: any) => {
//     if (item.type === "MODEL") {
//       models.push(item?.name);
//     }

//     //     const mapAttribute = item.attributes?.find(
//     //       (attr: any) => attr.name === "map" || attr.name === "@@map",
//     //     );
//     //     const dbName = mapAttribute?.args?.[0]?.value?.value || modelName;
//     //     // Extract fields
//     //     const fields = item.children
//     //       .filter((child: any) => child.type === "FIELD")
//     //       .map((field: any) => ({
//     //         name: field.name,
//     //         type: field.fieldType.name,
//     //         isOptional: field.optional,
//     //         isList: field.array,
//     //         attributes: field.attributes || [],
//     //       }));
//   });
// };
