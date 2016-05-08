package ro.fmarket.admin.account.company;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class CompanySearchObject {

	private Integer page;
	
	private Integer id;
	private String name;
	private String email;
	private Integer companyDomainId;
	private List<Integer> demandDomainIds = new ArrayList<>();
	
}
