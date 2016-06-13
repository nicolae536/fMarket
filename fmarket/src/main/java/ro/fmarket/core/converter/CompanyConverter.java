package ro.fmarket.core.converter;

import java.util.ArrayList;
import java.util.List;

import ro.fmarket.model.company.Company;
import ro.fmarket.model.company.CompanyDetailsDTO;
import ro.fmarket.model.company.contact.CompanyContactInfo;
import ro.fmarket.model.company.review.CompanyMessageReview;
import ro.fmarket.model.company.review.CompanyMessageReviewDTO;

public class CompanyConverter {

	public static CompanyDetailsDTO toDetails(Company company) {
		CompanyDetailsDTO result = new CompanyDetailsDTO();
		CompanyContactInfo contactInfo = company.getContactInfo();
		result.setId(company.getId());
		result.setName(company.getName());
		result.setEmail(contactInfo.getEmail());
		result.setPhone(contactInfo.getEmail());
		result.setAddress(contactInfo.getAddress());
		result.setContactPerson(contactInfo.getContactPerson());
		result.setLatitude(contactInfo.getLatitude());
		result.setLongitude(contactInfo.getLongitude());
		if (company.getVotes() == 0) {
			result.setScore(0);
		} else {
			int avgScore = company.getScore() / company.getVotes();
			result.setScore(avgScore);
		}
		return result;
	}

	public static CompanyMessageReviewDTO toReviewDTO(CompanyMessageReview review) {
		CompanyMessageReviewDTO result = new CompanyMessageReviewDTO();
		result.setDate(review.getDateInserted());
		result.setMessage(review.getMessage());
		return result;
	}

	public static List<CompanyMessageReviewDTO> toReviewDTOList(List<CompanyMessageReview> reviews) {
		List<CompanyMessageReviewDTO> result = new ArrayList<>();
		for (CompanyMessageReview review : reviews) {
			result.add(toReviewDTO(review));
		}
		return result;
	}
}
