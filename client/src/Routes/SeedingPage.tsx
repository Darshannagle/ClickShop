import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { endPoint } from "../config/siteConfig";
import toast from "react-hot-toast";
import { getAPIData } from "@/helper/apiHelper";

const SeedingPage = () => {
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [subCategoryList, setSubCategoryList] = useState<any[]>([]);

  // Category states
  const [categoryName, setCategoryName] = useState<string>("");

  // Subcategory states
  const [subCategoryName, setSubCategoryName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Product states
  const [productName, setProductName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [basePrice, setBasePrice] = useState<number>(0);
  const [salePrice, setSalePrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [images, setImages] = useState<string>(""); // comma-separated string
  const [specifications, setSpecifications] = useState({}); // comma-separated string
  const [loding, SetLoading] = useState({
    categoryLoading: false,
    subCategoryLoading: false,
    productLoading: false,
  });
  // Fetch categories
  const fetchCategories = async () => {
    const response = await getAPIData(endPoint.category.list, {}, "GET");
    if (response?.status) {
      setCategoryList(response?.data);
    } else {
      toast.error(response?.message || "Something went wrong");
    }
  };

  // Fetch subcategories for selected category
  const fetchSubCategories = async (categoryId: string) => {
    const response = await getAPIData(
      endPoint.subcategory.listByCategory,
      { field: "id", category: categoryId },
      "GET",
    );
    if (response?.status) {
      setSubCategoryList(response?.data);
    } else {
      toast.error(response?.message || "Something went wrong");
    }
  };

  // Create Category
  const createCategory = async () => {
    const response = await getAPIData(
      endPoint.category.create,
      { name: categoryName },
      "POST",
    );
    if (response?.status) {
      toast.success("Category created successfully");
      setCategoryName("");
      fetchCategories();
    } else {
      toast.error(response?.message || "Something went wrong");
    }
  };

  // Create Subcategory
  const createSubCategory = async () => {
    const response = await getAPIData(
      endPoint.subcategory.create,
      { name: subCategoryName, categoryId: selectedCategory },
      "POST",
    );
    if (response?.status) {
      toast.success("Subcategory created successfully");
      setSubCategoryName("");
      fetchSubCategories(selectedCategory);
    } else {
      toast.error(response?.message || "Something went wrong");
    }
  };

  // Create Product
  const createProduct = async () => {
    SetLoading({ ...loding, productLoading: true });
    const response = await getAPIData(
      endPoint.product.create,
      {
        name: productName,
        brand,
        description,
        basePrice,
        salePrice,
        stock,
        category_id: selectedCategory,
        subcategory_id: selectedSubCategory,
        images: images.split(",").map((img) => img.trim()),
        specifications: JSON.parse((specifications as any).toString()),
      },
      "POST",
    );
    if (response?.status) {
      toast.success("Product created successfully");
      setProductName("");
      setBrand("");
      setDescription("");
      setBasePrice(0);
      setSalePrice(0);
      setStock(0);
      setImages("");
      setSelectedSubCategory("");
      setSpecifications({});
    } else {
      toast.error(response?.message || "Something went wrong");
    }

    SetLoading({ ...loding, productLoading: false });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box>
      <h1>Seeding Page</h1>

      {/* Category Section */}
      <Card sx={{ p: 2, mb: 3 }}>
        <h2>Create Category</h2>
        <TextField
          fullWidth
          label="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={createCategory}
          disabled={!categoryName}
        >
          Add Category
        </Button>
      </Card>

      {/* Subcategory Section */}
      <Card sx={{ p: 2, mb: 3 }}>
        <h2>Create Subcategory</h2>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              fetchSubCategories(e.target.value);
            }}
          >
            {categoryList.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Subcategory Name"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={createSubCategory}
          disabled={!subCategoryName || !selectedCategory}
        >
          Add Subcategory
        </Button>
      </Card>

      {/* Product Section */}
      <Card sx={{ p: 2 }}>
        <h2>Create Product</h2>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              fetchSubCategories(e.target.value);
            }}
          >
            {categoryList.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Subcategory</InputLabel>
          <Select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            {subCategoryList.map((sub) => (
              <MenuItem key={sub.id} value={sub.id}>
                {sub.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="Base Price"
          value={basePrice}
          onChange={(e) => setBasePrice(Number(e.target.value))}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="Sale Price"
          value={salePrice}
          onChange={(e) => setSalePrice(Number(e.target.value))}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Images (comma separated)"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="specifications"
          value={specifications}
          onChange={(e) => setSpecifications(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="success"
          onClick={createProduct}
          disabled={
            !productName || !selectedCategory || !selectedSubCategory
            // ||loding?.productLoading
          }
        >
          {loding?.productLoading ? "Loading..." : "Add Product"}
        </Button>
      </Card>
    </Box>
  );
};

export default SeedingPage;
