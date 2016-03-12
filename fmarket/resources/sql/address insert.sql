INSERT INTO gnm1.country(
            id, initials, name)
    VALUES ('1', 'RO', 'romania');

INSERT INTO gnm1.county(
            id, initials, name, country_id)
    VALUES ('1', 'CJ', 'cluj', '1');

INSERT INTO gnm1.city(
            id, name, county_id)
    VALUES ('1', 'CLUJ NAPOCA', '1');

INSERT INTO gnm1.address(
            id, apartament, block, entrance, floor, "number", postal_code, 
            street, city_id)
    VALUES ('1', '3', 'C4', '2', '3', '2', '123', 
            'street name', '1');
