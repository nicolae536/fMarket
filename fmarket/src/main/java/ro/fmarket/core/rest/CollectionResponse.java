package ro.fmarket.core.rest;

import java.util.Collection;

import lombok.Data;

@Data
public class CollectionResponse<T> {

	private int page;
	private int totalPages;
	private Collection<T> data;
	
	public CollectionResponse(Collection<T> data) {
		this.data = data;
	}
	
	public CollectionResponse(Collection<T> data, int totalPAges) {
		this.data = data;
		this.totalPages = totalPAges;
	}
	
	public CollectionResponse(Collection<T> data, int totalPages, int page) {
		this.data = data;
	}
	
}
