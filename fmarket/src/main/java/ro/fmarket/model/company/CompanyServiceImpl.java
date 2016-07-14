package ro.fmarket.model.company;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.converter.CompanyConverter;
import ro.fmarket.core.utils.DateUtils;
import ro.fmarket.model.account.AccountDao;
import ro.fmarket.model.company.logo.CompanyLogo;
import ro.fmarket.model.company.logo.CompanyLogoDao;
import ro.fmarket.model.company.review.CompanyMessageReview;
import ro.fmarket.model.company.review.CompanyMessageReviewDTO;
import ro.fmarket.model.company.review.CompanyMessageReviewDao;
import ro.fmarket.model.company.review.CompanyStarsReview;
import ro.fmarket.model.company.review.CompanyStarsReviewDao;
import ro.fmarket.model.company.review.NewCompanyMessageReview;
import ro.fmarket.model.company.review.NewCompanyStarsReview;

@Service
@Transactional
public class CompanyServiceImpl implements CompanyService {

	private static final Logger LOG = Logger.getLogger(CompanyServiceImpl.class);
	
	@Autowired
	private AccountDao accountDao;

	@Autowired
	private CompanyDao companyDao;

	@Autowired
	private CompanyLogoDao companyLogoDao;

	@Autowired
	private CompanyMessageReviewDao companyMessageReviewDao;

	@Autowired
	private CompanyStarsReviewDao companyStarsReviewDao;

	@Override
	public CompanyDetailsDTO getCompanyDetails(int id) {
		Company company = companyDao.get(id);
		return CompanyConverter.toDetails(company);
	}

	@Override
	public List<CompanyMessageReviewDTO> getCompanyReviews(int id) {
		List<CompanyMessageReview> reviews = companyMessageReviewDao.getForCompany(id);
		return CompanyConverter.toReviewDTOList(reviews);
	}

	@Override
	public void addStarsReview(Integer accountId, NewCompanyStarsReview request) {
		CompanyStarsReview review = companyStarsReviewDao.getForAccount(accountId);
		if (review != null) {
			// TODO update
		} else {
			// TODO create
		}
	}

	@Override
	public void addMessageReview(Integer accountId, NewCompanyMessageReview request) {
		CompanyMessageReview review = createNewReview(request);
		review.setAccount(accountDao.load(accountId));
		companyMessageReviewDao.save(review);
	}

	@Override
	public List<FullDomainDTO> getCompaniesGroupedByDomain(String name) {
		List<FullDomainDTO> resultList = new ArrayList<>();
		List<Company> sortedCompanies = companyDao.getCompaniesByCompanyDomain(name);

		Map<String, List<CompanyNameDTO>> groups = new LinkedHashMap<>();

		for (Company company : sortedCompanies) {
			CompanyNameDTO dto = new CompanyNameDTO(company.getId(), company.getName());
			String domain = company.getDomain().getName();
			if (groups.containsKey(domain)) {
				groups.get(domain).add(dto);
			} else {
				ArrayList<CompanyNameDTO> newList = new ArrayList<CompanyNameDTO>();
				newList.add(dto);
				groups.put(domain, newList);
			}
		}
		for (Map.Entry<String, List<CompanyNameDTO>> entry : groups.entrySet()) {
			resultList.add(new FullDomainDTO(entry.getKey(), entry.getValue()));
		}
		return resultList;
	}

	@Override
	public byte[] getLogo(int companyId) {
		CompanyLogo logo = companyLogoDao.getByCompany(companyId);
		if (logo == null) {
			InputStream in = getClass().getResourceAsStream("/no_logo.jpg");
			try {
				return IOUtils.toByteArray(in);
			} catch (IOException e) {
				throw new RuntimeException("An error occurred");
			}
		} else {
			return logo.getFile();
		}
	}

	private CompanyMessageReview createNewReview(NewCompanyMessageReview request) {
		CompanyMessageReview result = new CompanyMessageReview();
		result.setDateInserted(DateUtils.now());
		result.setMessage(request.getMessage());
		result.setCompany(companyDao.load(request.getCompanyId()));
		return result;
	}
}
