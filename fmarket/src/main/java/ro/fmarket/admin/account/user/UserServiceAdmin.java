package ro.fmarket.admin.account.user;

import ro.fmarket.core.rest.PaginatedResponse;

public interface UserServiceAdmin {

	PaginatedResponse<UserDTO> searchUsers(UserSearchObject searchObject, Integer page);
	
	void deleteUser(Integer accountId);
	
	void createUser(NewUserRequest request);
	
	void updateUser(Integer accountId, NewUserRequest request);
	
	UserDTO getUser(Integer accountId);
}
