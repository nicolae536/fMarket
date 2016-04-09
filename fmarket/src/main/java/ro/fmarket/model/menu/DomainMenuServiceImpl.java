package ro.fmarket.model.menu;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.converter.DomainMenuConverter;
import ro.fmarket.model.domain.demand.DemandDomainDao;

@Service
@Transactional
public class DomainMenuServiceImpl implements DomainMenuService {

	@Autowired
	private DomainMenuDao dao;
	
	@Autowired
	private DemandDomainDao demandDomainDao;

	@Override
	public List<DomainMenuItemDTO> getMenu() {
		List<DomainMenuItem> items = dao.getList();
		return DomainMenuConverter.toDTO(items);
	}

	@Override
	public void addMenuItem(NewDomainMenuItemRequest request) {
		final DomainMenuItem itemForSave = createNewItem(request);
		dao.save(itemForSave);
	}

	@Override
	public void deleteMenuItem(int id) {
		dao.deleteById(id);
		
	}

	@Override
	public void updateMenuItem(UpdateDomainMenuItemRequest request) {
		DomainMenuItem itemForUpdate = dao.get(request.getId());
		if (itemForUpdate != null) {
			itemForUpdate.setName(request.getNewName());
			if (request.getOrderNr() != null) {
				itemForUpdate.setOderNr(request.getOrderNr());
			}
			dao.update(itemForUpdate);
		}
	}
	
	private DomainMenuItem createNewItem(NewDomainMenuItemRequest request) {
		final DomainMenuItem newItem = new DomainMenuItem();
		newItem.setName(request.getName());
		newItem.setOderNr(request.getOrderNr());
		
		Integer parentId = request.getParentId();
		if (parentId != null) {
			DomainMenuItem parent = dao.get(parentId);
			newItem.setParent(dao.load(parentId));
			newItem.setLevel(parent.getLevel() + 1);
		} else {
			newItem.setLevel(0); // sau 1
		}
		Integer domainId = request.getDomainId();
		if (domainId != null) {
			newItem.setDomain(demandDomainDao.load(domainId));
		}
		
		return newItem;
	}
	

}
