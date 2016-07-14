package ro.fmarket.model.company;

import lombok.Data;

@Data
public class CompanyNameDTO {

	private int id;

	private String name;

	public CompanyNameDTO(int id, String name) {
		this.id = id;
		this.name = name;
	}
}
