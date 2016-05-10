package ro.fmarket.model.company;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class FullDomainDTO {

	private String domainName;
	
	private List<CompanyNameDTO> companies = new ArrayList<>();
	
	public void addCompanyName(CompanyNameDTO dto) {
		companies.add(dto);
	}
	
	public FullDomainDTO(String name, List<CompanyNameDTO> companies) {
		this.domainName = name;
		this.companies = companies;
	}
}
