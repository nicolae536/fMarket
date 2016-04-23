package ro.fmarket.core.rest;

import java.util.Collection;

import lombok.Data;

@Data
public class PaginatedResponse<T> {

	private int page;
	private int totalPages;
	private Collection<T> data;
	
	public PaginatedResponse(Collection<T> data) {
		this.data = data;
	}
	
	public PaginatedResponse(Collection<T> data, int totalPAges) {
		this.data = data;
		this.totalPages = totalPAges;
	}
	
	public PaginatedResponse(Collection<T> data, int totalPages, int page) {
		this.data = data;
	}
	
}
