package ro.fmarket.admin.demand;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.core.rest.PaginatedResponse;
import ro.fmarket.model.demand.consts.DemandStatus;

@RestController
@RequestMapping("/admin/demands")
public class DemandControllerAdmin {

	@Autowired
	private DemandServiceAdmin service;

	@RequestMapping(value = "/statuses", method = RequestMethod.GET)
	public DemandStatus[] getDemandStatuses() {
		return DemandStatus.values();
	}

	@RequestMapping(value = "/accept/{id}", method = RequestMethod.POST)
	public void acceptDemand(@PathVariable("id") Integer id) {
		service.acceptDemand(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public DemandDetailsDTO getDemandDetails(@PathVariable("id") Integer id) {
		return service.getDemandDetails(id);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public void updateDemand(@Valid @RequestBody UpdateDemandRequest request) {
		service.updateDemand(request);
	}

	@RequestMapping(value = "/decline/{id}", method = RequestMethod.POST)
	public void declineDemand(@Valid @RequestBody DeclineDemandRequest request) {
		service.declineDemand(request);
	}

	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public List<DemandAdminDTO> getInReviewDemands() {
		return service.getInReviewDemands();
	}

	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public PaginatedResponse<DemandAdminDTO> searchDomains(@Valid @RequestBody DemandSearchObject searchObject) {
		return service.searchDemands(searchObject);
	}

	@RequestMapping(value = "/newcount", method = RequestMethod.POST)
	public int getNewDemandsCount() {
		return service.getNewDemandsCount();
	}

}
