package ro.fmarket.admin.demand;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.converter.DemandAdminConverter;
import ro.fmarket.core.rest.PaginatedResponse;
import ro.fmarket.mail.MailService;
import ro.fmarket.mail.NewDemandInterceptor;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.demand.Demand;
import ro.fmarket.model.demand.DemandDao;
import ro.fmarket.model.demand.consts.DemandStatus;

@Service
@Transactional
public class DemandServiceAdminImpl implements DemandServiceAdmin {

	@Autowired
	private MailService mailService;

	@Autowired
	private NewDemandInterceptor newDemandInterceptor;

	@Autowired
	private DemandDao demandDao;

	@Override
	public List<DemandAdminDTO> getInReviewDemands() {
		List<Demand> demands = demandDao.getDemandsByStatuses(DemandStatus.IN_REVIEW);
		return DemandAdminConverter.toDTOList(demands);
	}

	@Override
	public void acceptDemand(int id) {
		final Demand demand = demandDao.get(id);
		if (demand != null && (demand.getStatus().equals(DemandStatus.IN_REVIEW))) {
			demand.setStatus(DemandStatus.ACTIVE);
			newDemandInterceptor.intercept(demand); // send mail to all matched companies.
		}
	}

	@Override
	public void updateDemand(UpdateDemandRequest request) {
		final Demand demand = demandDao.get(request.getDemandId());
		// TODO
		demandDao.save(demand);

	}

	@Override
	public void declineDemand(DeclineDemandRequest request) {
		Demand demand = demandDao.get(request.getId());
		Account account = demand.getAccount();
		demand.setStatus(DemandStatus.REJECTED);
		demandDao.update(demand);
		// mailService.sendMailForRejectedDemand(account.getEmail(), request.getMessage());

	}

	@Override
	public int getNewDemandsCount() {
		int count = demandDao.getWaitingForReviewDemandsCount();
		if (count > 0) {
			demandDao.updateAllWaitingForReviewDemands();
		}
		return count;
	}

	@Override
	public PaginatedResponse<DemandAdminDTO> searchDemands(DemandSearchObject searchObject) {
		return null;
	}

	@Override
	public DemandDetailsDTO getDemandDetails(int id) {
		Demand demand = demandDao.get(id);
		return null;
	}

}
