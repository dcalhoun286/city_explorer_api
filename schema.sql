DROP TABLE city;

CREATE TABLE city(
  id SERIAL PRIMARY KEY,
  search_query VARCHAR(255),
  formatted_query VARCHAR(255),
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6)
);
