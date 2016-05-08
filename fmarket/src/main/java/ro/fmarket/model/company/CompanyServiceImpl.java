package ro.fmarket.model.company;

import javax.validation.Valid;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import ro.fmarket.model.company.review.NewCompanyMessageReview;
import ro.fmarket.model.company.review.NewCompanyStarsReview;

@Service
@Transactional
public class CompanyServiceImpl implements CompanyService {

	@Override
	public void createCompany(NewCompanyRequest request) {

	}

	@Override
	public CompanyDetailsDTO getCompanyDetails(Integer id) {
		return null;
	}

	@Override
	public void addStarsReview(NewCompanyStarsReview request) {

	}

	@Override
	public void addMessageReview(@Valid @RequestBody NewCompanyMessageReview request) {

	}
}
