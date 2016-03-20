package ro.fmarket.core.utils;

public class PaginationUtils {

	public static int calculateTotalPages(int pageSize, int totalCount) {
		return (totalCount + pageSize - 1) / totalCount;
	}
	
}
