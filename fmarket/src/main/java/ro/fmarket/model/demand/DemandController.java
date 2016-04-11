package ro.fmarket.model.demand;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.security.FMarketPrincipal;

@RestController
@RequestMapping("/demands")
public class DemandController {

	@Autowired
	private DemandService service;
	
	@RequestMapping(method = RequestMethod.POST)
	public void addNewDemand(NewDemandRequest request, @AuthenticationPrincipal FMarketPrincipal principal) {
		service.addDemand(principal.getAccountId(), request);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public void getAccountDemands(@AuthenticationPrincipal FMarketPrincipal principal) {
		service.getAccountDemands(principal.getAccountId());
	}
	
	@RequestMapping(method = RequestMethod.PUT)
	public void cancelDemand(CancelDemandRequest request, @AuthenticationPrincipal FMarketPrincipal principal) {
		service.cancelDemand(principal.getAccountId(), request);
	}
	
}
