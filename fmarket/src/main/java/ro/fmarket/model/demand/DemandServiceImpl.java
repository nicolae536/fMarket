package ro.fmarket.model.demand;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DemandServiceImpl implements DemandService {

	@Autowired
	private DemandDao dao;
	
	@Override
	public void addDemand(Integer accountId, NewDemandRequest request) {
		
	}

	@Override
	public void cancelDemand(Integer accountId, CancelDemandRequest request) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void getAccountDemands(Integer accountId) {
		// TODO Auto-generated method stub
		
	}
	
}
