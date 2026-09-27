import { ModelName } from "./Base";
import BaseDao from "./BaseDao";

export class ProductDao extends BaseDao {
  protected static modelName: ModelName = "Product";
  constructor() {
    super();
  }

  static async findWithFilter(
    filters: {
      search?: string;
      categoryId?: string;
      subcategoryId?: string;
      minPrice?: number;
      maxPrice?: number;
      brand?: string;
      sortBy?: string;
      sortOrder?: "ASC" | "DESC";
    },
    page?: number,
    limit?: number,
  ) {
    let query: any = {};
    if (filters?.search)
      query.$or = [
        {
          name: { $contains: filters?.search || "" },
        },
        {
          description: { $contains: filters?.search || "" },
        },
        {
          brand: { $contains: filters?.search || "" },
        },
        {
          "category.name": { $contains: filters?.search || "" },
        },
        {
          "subcategory.name": { $contains: filters?.search || "" },
        },
      ];

    if (filters.categoryId) query.categoryId = filters.categoryId;
    if (filters.subcategoryId) query.subcategoryId = filters.subcategoryId;
    if (filters.minPrice) query.salePrice = { gte: filters.minPrice };
    if (filters.maxPrice) query.salePrice = { lte: filters.maxPrice };
    if (filters.brand) query.brand = filters.brand;

    const result = await this.paginate(query, {
      page,
      limit,
      [filters?.sortBy || "createdAt"]: filters?.sortOrder || "DESC",
    });
    return result;
  }

  static brandList = async () => {
    const result = await this.repository.findMany({
      select: { brand: true },
      distinct: ["brand"],
    });
    return result.map((item: any) => item.brand);
  };
}
