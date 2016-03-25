package ro.fmarket.admin.account.user;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.core.rest.CollectionResponse;

@RestController
@RequestMapping("/admin/users")
public class UserControllerAdmin {

	@Autowired
	private UserServiceAdmin userService;

	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public CollectionResponse<UserDTO> searchUsers(@Valid @RequestBody UserSearchObject searchObject, @RequestParam("page") Integer page) {
		return userService.searchUsers(searchObject, page);
	}

	@RequestMapping(method = RequestMethod.POST)
	public void createUser(@RequestBody NewUserRequest request) {
		System.out.println(request.getPassword()+"------------------------------------------------------------------------");
		userService.createUser(request);
	}

	@RequestMapping(value="/{id}",method = RequestMethod.PUT)
	public void updateUser(@PathVariable("id") Integer id, @RequestBody NewUserRequest request) {

	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteUser(@PathVariable("id") Integer id) {
		userService.deleteUser(id);
	}
	
}
