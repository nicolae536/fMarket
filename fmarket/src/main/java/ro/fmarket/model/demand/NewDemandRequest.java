package ro.fmarket.model.demand;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class NewDemandRequest {

	 /*
     * Demand
     */
    private String description;
    private List<Long> cities = new ArrayList<>();
    private Long domainId;
    private String title;

    /**
     * Account
     */
    private String email;
    private boolean termsAgreed;

    /*
     * Contact
     */
    private String phone;
    private String name;
    private boolean disagreePhoneContact;
    private boolean disagreeEmailContact;
    private boolean allCities;
	
}
