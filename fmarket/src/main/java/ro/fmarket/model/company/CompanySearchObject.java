package ro.fmarket.model.company;

import lombok.Data;

@Data
public class CompanySearchObject {

	private String name;
	
	private Integer domainId;
	
	private Integer page;
}
