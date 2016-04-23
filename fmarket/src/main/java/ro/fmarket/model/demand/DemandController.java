package ro.fmarket.model.demand;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
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
	public void addNewDemand(@Valid @RequestBody NewDemandRequest request, @AuthenticationPrincipal FMarketPrincipal principal) {
		if (principal == null) {
			service.addDemand(request, false);
		} else {
			request.setEmail(principal.getUsername());
			service.addDemand(request, true);
		}
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public List<SelfDemandDTO> getAccountDemands(@AuthenticationPrincipal FMarketPrincipal principal) {
		return service.getAccountDemands(principal.getAccountId());
	}

	@RequestMapping(method = RequestMethod.PUT)
	public void closeDemand(CancelDemandRequest request, @AuthenticationPrincipal FMarketPrincipal principal) {
		service.closeDemand(principal.getAccountId(), request);
	}

}
