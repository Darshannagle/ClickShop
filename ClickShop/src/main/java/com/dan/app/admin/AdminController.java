package com.dan.app.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

//import com.Dan.Shopsify.service.userService;
import com.dan.app.model.Product;
import com.dan.app.service.ProductService;



@Controller
@RequestMapping("/admin")
public class AdminController {

	public AdminController() {
	}

	

	@Autowired
	private com.dan.app.service.userService userService;
	@Autowired
	private ProductService productService;
	
	@GetMapping("/")
	public String admin() {
		return "admin";
	}

//=================================================Login=============================================
	
	
	
	
	
//	=================================================Products=============================================
	
	
	@GetMapping(path = {"/Products","/Products:{message}"})
	public String Products(@PathVariable(value ="message", required = false) String message,  Model model) {
		List<Product> products = productService.getAllProducts();
		model.addAttribute("Products", products);
		model.addAttribute("message", message );
		
		return "Products";
	}
	
@GetMapping("/Products/addForm")
public String goToAddProduct( Model model) {	
	Product product = new Product();
	model.addAttribute("product", product);
return "Products-add";
}

@PostMapping("/Products/add")
public String addProduct(@RequestBody Product product) {

	productService.addProduct(product);

	return "redirect:/admin/Products:added Successfully";
}

	
	@GetMapping("/Products/updateForm/{id}")
	public String getProductUpdateForm(@PathVariable("id") Long id,Model model) {
	
		Product product = productService.getProduct(id);

		model.addAttribute("product", product);
		return "Products-update";
	}
	@PostMapping("/Products/update")
	public String UpdateProduct(@ModelAttribute("product") Product product,RedirectAttributes redirectAttributes) {
		
	productService.addProduct(product);
	redirectAttributes.addFlashAttribute("success","Updated Successfully");
			
		
	return "redirect:/admin/Products:Updated Successfully";
	}
	
	@GetMapping("/Products/delete/{id}")
	public String requestMethodName(@PathVariable("id") Long id) {
			productService.deleteProduct(id);
			

			return "redirect:/admin/Products:deleted Successfully";
	}
	
	
//	============================================Users==================================================
	
	
	
	
	
	
	
	
	
}
