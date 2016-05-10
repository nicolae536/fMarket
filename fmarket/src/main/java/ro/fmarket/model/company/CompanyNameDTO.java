package ro.fmarket.model.company;

import lombok.Data;

@Data
public class CompanyNameDTO {

	private int id;

	private String name;

	private String logoSrc;

	public CompanyNameDTO(int id, String name, String logoSrc) {
		this.id = id;
		this.name = name;
		this.logoSrc = logoSrc;
	}
}
