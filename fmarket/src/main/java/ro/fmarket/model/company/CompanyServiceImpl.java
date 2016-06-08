package ro.fmarket.model.company;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.admin.account.company.CompanyDetailsAdminDTO;
import ro.fmarket.model.company.logo.CompanyLogo;
import ro.fmarket.model.company.logo.CompanyLogoDao;
import ro.fmarket.model.company.review.NewCompanyMessageReview;
import ro.fmarket.model.company.review.NewCompanyStarsReview;

@Service
@Transactional
public class CompanyServiceImpl implements CompanyService {

	@Autowired
	private CompanyDao companyDao;

	@Autowired
	private CompanyLogoDao companyLogoDao;

	@Override
	public CompanyDetailsAdminDTO getCompanyDetails(int id) {
		return null;
	}

	@Override
	public void addStarsReview(Integer accountId, NewCompanyStarsReview request) {

	}

	@Override
	public void addMessageReview(Integer accountId, NewCompanyMessageReview request) {

	}

	@Override
	public List<FullDomainDTO> getCompaniesGroupedByDomain(String name) {
		List<FullDomainDTO> resultList = new ArrayList<>();
		List<Company> sortedCompanies = companyDao.getCompaniesByCompanyDomain(name);

		Map<String, List<CompanyNameDTO>> groups = new LinkedHashMap<>();

		for (Company company : sortedCompanies) {
			CompanyNameDTO dto = new CompanyNameDTO(company.getId(), company.getName()); // TODO
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
}
