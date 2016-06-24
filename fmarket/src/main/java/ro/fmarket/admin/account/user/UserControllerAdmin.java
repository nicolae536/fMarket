package ro.fmarket.admin.account.user;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.core.rest.PaginatedResponse;
import ro.fmarket.model.account.consts.AccountStatus;
import ro.fmarket.model.demand.consts.DemandStatus;

@RestController
@RequestMapping("/admin/users")
public class UserControllerAdmin {

	@Autowired
	private UserServiceAdmin userService;

	@RequestMapping(value = "/statuses", method = RequestMethod.GET)
	public AccountStatus[] getDemandStatuses() {
		return AccountStatus.values();
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public PaginatedResponse<UserDTO> searchUsers(@Valid @RequestBody UserSearchObject searchObject, @RequestParam("page") Integer page) {
		return userService.searchUsers(searchObject, page);
	}

	@RequestMapping(method = RequestMethod.POST)
	public void createUser(@RequestBody NewUserRequest request) {
		userService.createUser(request);
	}

	@RequestMapping(value="/{id}",method = RequestMethod.PUT)
	public void updateUser(@PathVariable("id") Integer id, @RequestBody NewUserRequest request) {

	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteUser(@PathVariable("id") Integer id) {
		userService.deleteUser(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public UserDTO getUserDetails(@PathVariable("id") Integer id) {
		return userService.getUser(id);
	}
	
}
