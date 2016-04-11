package ro.fmarket.admin.demand;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/demands")
public class DemandControllerAdmin {

	@Autowired
	private DemandServiceAdmin service;
	
}
