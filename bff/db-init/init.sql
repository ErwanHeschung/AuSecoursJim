-- Insert ingredients into the ingredient table
INSERT INTO ingredient (name)
VALUES
('Cognac'),
('Port wine'),
('Sea salt'),
('Black pepper'),
('Brioche toast'),
('Eggs'),
('Breadcrumbs'),
('Mixed nuts'),
('Goat cheese'),
('Mixed greens'),
('Honey'),
('Walnuts'),
('Olive oil'),
('Fresh salmon'),
('Fresh dill'),
('Avocado'),
('Sesame seeds'),
('Burrata cheese'),
('Cherry tomatoes'),
('Fresh basil'),
('Extra virgin olive oil'),
('Balsamic glaze'),
('Tomato sauce'),
('Mozzarella'),
('Ham'),
('Mushrooms'),
('Oregano'),
('Beef patty'),
('Brioche bun'),
('Cheddar cheese'),
('Lettuce'),
('Tomato'),
('Pickles'),
('Onion'),
('Special sauce Jim'),
('Octopus'),
('Lemon'),
('Garlic'),
('Strawberries'),
('Blueberries'),
('Kiwi'),
('Mango'),
('Grapes'),
('Pineapple')
ON CONFLICT (name) DO NOTHING;

-- Homemade foie gras terrine
INSERT INTO item_ingredient (item_id, ingredient_id, quantity) VALUES
('68e36c2d119c6aea9a40ddf7', (SELECT _id FROM ingredient WHERE name='Cognac'), 1),
('68e36c2d119c6aea9a40ddf7', (SELECT _id FROM ingredient WHERE name='Port wine'), 1),
('68e36c2d119c6aea9a40ddf7', (SELECT _id FROM ingredient WHERE name='Sea salt'), 1),
('68e36c2d119c6aea9a40ddf7', (SELECT _id FROM ingredient WHERE name='Black pepper'), 1),
('68e36c2d119c6aea9a40ddf7', (SELECT _id FROM ingredient WHERE name='Brioche toast'), 1);

-- Soft-boiled egg breaded with breadcrumbs and nuts
INSERT INTO item_ingredient (item_id, ingredient_id, quantity) VALUES
('68e36c2d119c6aea9a40ddfa', (SELECT _id FROM ingredient WHERE name='Eggs'), 2),
('68e36c2d119c6aea9a40ddfa', (SELECT _id FROM ingredient WHERE name='Breadcrumbs'), 1),
('68e36c2d119c6aea9a40ddfa', (SELECT _id FROM ingredient WHERE name='Mixed nuts'), 1);

-- Goat cheese foom from "Valbonne goat farm"
INSERT INTO item_ingredient (item_id, ingredient_id, quantity) VALUES
('68e36c2d119c6aea9a40ddfd', (SELECT _id FROM ingredient WHERE name='Goat cheese'), 1),
('68e36c2d119c6aea9a40ddfd', (SELECT _id FROM ingredient WHERE name='Mixed greens'), 1),
('68e36c2d119c6aea9a40ddfd', (SELECT _id FROM ingredient WHERE name='Honey'), 2),
('68e36c2d119c6aea9a40ddfd', (SELECT _id FROM ingredient WHERE name='Walnuts'), 1),
('68e36c2d119c6aea9a40ddfd', (SELECT _id FROM ingredient WHERE name='Olive oil'), 1);

-- Homemade dill salmon gravlax
INSERT INTO item_ingredient (item_id, ingredient_id, quantity) VALUES
('68e36c2d119c6aea9a40de00', (SELECT _id FROM ingredient WHERE name='Fresh salmon'), 1),
('68e36c2d119c6aea9a40de00', (SELECT _id FROM ingredient WHERE name='Fresh dill'), 1),
('68e36c2d119c6aea9a40de00', (SELECT _id FROM ingredient WHERE name='Sea salt'), 1);

-- Crab maki with fresh mango
INSERT INTO item_ingredient (item_id, ingredient_id, quantity) VALUES
('68e36c2d119c6aea9a40de03', (SELECT _id FROM ingredient WHERE name='Avocado'), 1),
('68e36c2d119c6aea9a40de03', (SELECT _id FROM ingredient WHERE name='Sesame seeds'), 1);

-- Burrata Mozzarella
INSERT INTO item_ingredient (item_id, ingredient_id, quantity) VALUES
('68e36c2d119c6aea9a40de06', (SELECT _id FROM ingredient WHERE name='Burrata cheese'), 1),
('68e36c2d119c6aea9a40de06', (SELECT _id FROM ingredient WHERE name='Cherry tomatoes'), 1),
('68e36c2d119c6aea9a40de06', (SELECT _id FROM ingredient WHERE name='Fresh basil'), 10),
('68e36c2d119c6aea9a40de06', (SELECT _id FROM ingredient WHERE name='Extra virgin olive oil'), 1),
('68e36c2d119c6aea9a40de06', (SELECT _id FROM ingredient WHERE name='Balsamic glaze'), 1);

-- Delicious Pizza Regina
INSERT INTO item_ingredient (item_id, ingredient_id, quantity) VALUES
('68e36c2d119c6aea9a40de09', (SELECT _id FROM ingredient WHERE name='Tomato sauce'), 1),
('68e36c2d119c6aea9a40de09', (SELECT _id FROM ingredient WHERE name='Mozzarella'), 1),
('68e36c2d119c6aea9a40de09', (SELECT _id FROM ingredient WHERE name='Ham'), 1),
('68e36c2d119c6aea9a40de09', (SELECT _id FROM ingredient WHERE name='Mushrooms'), 1),
('68e36c2d119c6aea9a40de09', (SELECT _id FROM ingredient WHERE name='Oregano'), 1);

-- Homemade beef burger
INSERT INTO item_ingredient (item_id, ingredient_id, quantity) VALUES
('68e36c2d119c6aea9a40de0f', (SELECT _id FROM ingredient WHERE name='Beef patty'), 1),
('68e36c2d119c6aea9a40de0f', (SELECT _id FROM ingredient WHERE name='Brioche bun'), 1),
('68e36c2d119c6aea9a40de0f', (SELECT _id FROM ingredient WHERE name='Cheddar cheese'), 2),
('68e36c2d119c6aea9a40de0f', (SELECT _id FROM ingredient WHERE name='Lettuce'), 2),
('68e36c2d119c6aea9a40de0f', (SELECT _id FROM ingredient WHERE name='Tomato'), 2),
('68e36c2d119c6aea9a40de0f', (SELECT _id FROM ingredient WHERE name='Pickles'), 3),
('68e36c2d119c6aea9a40de0f', (SELECT _id FROM ingredient WHERE name='Onion'), 2),
('68e36c2d119c6aea9a40de0f', (SELECT _id FROM ingredient WHERE name='Special sauce Jim'), 1);

-- Half cooked tuna and octopus grilled on the plancha
INSERT INTO item_ingredient (item_id, ingredient_id, quantity) VALUES
('68e36c2d119c6aea9a40de15', (SELECT _id FROM ingredient WHERE name='Octopus'), 1),
('68e36c2d119c6aea9a40de15', (SELECT _id FROM ingredient WHERE name='Olive oil'), 1),
('68e36c2d119c6aea9a40de15', (SELECT _id FROM ingredient WHERE name='Lemon'), 1),
('68e36c2d119c6aea9a40de15', (SELECT _id FROM ingredient WHERE name='Garlic'), 2);
