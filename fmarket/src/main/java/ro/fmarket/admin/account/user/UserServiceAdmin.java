package ro.fmarket.admin.account.user;

import ro.fmarket.core.rest.CollectionResponse;

public interface UserServiceAdmin {

	CollectionResponse<UserDTO> searchUsers(UserSearchObject searchObject, Integer page);
	
	void deleteUser(Integer accountId);
	
	void createUser(NewUserRequest request);
	
	void updateUser(Integer accountId, NewUserRequest request);
}
