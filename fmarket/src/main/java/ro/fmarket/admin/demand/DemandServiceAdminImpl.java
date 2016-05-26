package ro.fmarket.admin.demand;

import static ro.fmarket.core.constants.PaginationConstants.*;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.converter.DemandAdminConverter;
import ro.fmarket.core.rest.PaginatedResponse;
import ro.fmarket.core.utils.DateUtils;
import ro.fmarket.core.utils.PaginationUtils;
import ro.fmarket.mail.MailService;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.demand.Demand;
import ro.fmarket.model.demand.DemandDao;
import ro.fmarket.model.demand.consts.DemandStatus;
import ro.fmarket.model.demand.interceptor.NewDemandInterceptor;
import ro.fmarket.model.domain.demand.DemandDomainDao;

@Service
@Transactional
public class DemandServiceAdminImpl implements DemandServiceAdmin {

	@Autowired
	private MailService mailService;

	@Autowired
	private NewDemandInterceptor newDemandInterceptor;

	@Autowired
	private DemandDao demandDao;
	
	@Autowired
	private DemandDomainDao demandDomainDao;

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
			demand.setActivationDate(DateUtils.now());
			demandDao.save(demand);
			newDemandInterceptor.intercept(demand); // send mail to all matched companies.
		}
	}

	@Override
	public void updateDemand(UpdateDemandRequest request) {
		final Demand demand = demandDao.get(request.getDemandId());
		setNewDemandFields(demand, request);
		demandDao.save(demand);

	}

	@Override
	public void declineDemand(DeclineDemandRequest request) {
		Demand demand = demandDao.get(request.getId());
		Account account = demand.getAccount();
		demand.setStatus(DemandStatus.REJECTED);
		demand.setClosedDate(DateUtils.now());
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
		Criteria criteria1 = demandDao.createCriteriaForDemands(searchObject);
		Criteria criteria2 = demandDao.createCriteriaForDemands(searchObject);
		List<Demand> demands = demandDao.searchDemands(criteria1, searchObject.getPage());
		int totalCount = demandDao.getCriteriaTotalCount(criteria2);
		final List<DemandAdminDTO> dtoList = DemandAdminConverter.toDTOList(demands);
		final PaginatedResponse<DemandAdminDTO> response = new PaginatedResponse<>(dtoList);
		response.setTotalPages(PaginationUtils.calculateTotalPages(DEMANDS_PAGE_SIZE, totalCount));
		response.setPage(searchObject.getPage() != null ? searchObject.getPage() : 1);
		return response;
	}

	@Override
	public DemandDetailsDTO getDemandDetails(int id) {
		final Demand demand = demandDao.get(id);
		return DemandAdminConverter.toDetails(demand);
	}

	private void setNewDemandFields(Demand demand, UpdateDemandRequest request) {
		demand.setStatus(request.getStatus());
		demand.setMessage(request.getMessage());
		demand.setTitle(request.getTitle());
		demand.setDomain(demandDomainDao.load(request.getDomainId()));
	}
	

}
