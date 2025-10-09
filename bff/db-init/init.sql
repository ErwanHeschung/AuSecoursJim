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
INSERT INTO item_ingredient (item_name, ingredient_id, quantity) VALUES
('Homemade foie gras terrine', (SELECT _id FROM ingredient WHERE name='Cognac'), 1),
('Homemade foie gras terrine', (SELECT _id FROM ingredient WHERE name='Port wine'), 1),
('Homemade foie gras terrine', (SELECT _id FROM ingredient WHERE name='Sea salt'), 1),
('Homemade foie gras terrine', (SELECT _id FROM ingredient WHERE name='Black pepper'), 1),
('Homemade foie gras terrine', (SELECT _id FROM ingredient WHERE name='Brioche toast'), 1);

-- Soft-boiled egg breaded with breadcrumbs and nuts
INSERT INTO item_ingredient (item_name, ingredient_id, quantity) VALUES
('Soft-boiled egg breaded with breadcrumbs and nuts', (SELECT _id FROM ingredient WHERE name='Eggs'), 1),
('Soft-boiled egg breaded with breadcrumbs and nuts', (SELECT _id FROM ingredient WHERE name='Breadcrumbs'), 1),
('Soft-boiled egg breaded with breadcrumbs and nuts', (SELECT _id FROM ingredient WHERE name='Mixed nuts'), 1);

-- Goat cheese foom from "Valbonne goat farm"
INSERT INTO item_ingredient (item_name, ingredient_id, quantity) VALUES
('Goat cheese foom from "Valbonne goat farm"', (SELECT _id FROM ingredient WHERE name='Goat cheese'), 1),
('Goat cheese foom from "Valbonne goat farm"', (SELECT _id FROM ingredient WHERE name='Mixed greens'), 1),
('Goat cheese foom from "Valbonne goat farm"', (SELECT _id FROM ingredient WHERE name='Honey'), 1),
('Goat cheese foom from "Valbonne goat farm"', (SELECT _id FROM ingredient WHERE name='Walnuts'), 1),
('Goat cheese foom from "Valbonne goat farm"', (SELECT _id FROM ingredient WHERE name='Olive oil'), 1);

-- Crab maki with fresh mango
INSERT INTO item_ingredient (item_name, ingredient_id, quantity) VALUES
('Crab maki with fresh mango', (SELECT _id FROM ingredient WHERE name='Avocado'), 1),
('Crab maki with fresh mango', (SELECT _id FROM ingredient WHERE name='Sesame seeds'), 1);

-- Burrata Mozzarella
INSERT INTO item_ingredient (item_name, ingredient_id, quantity) VALUES
('Burrata Mozzarella', (SELECT _id FROM ingredient WHERE name='Burrata cheese'), 1),
('Burrata Mozzarella', (SELECT _id FROM ingredient WHERE name='Cherry tomatoes'), 1),
('Burrata Mozzarella', (SELECT _id FROM ingredient WHERE name='Fresh basil'), 1),
('Burrata Mozzarella', (SELECT _id FROM ingredient WHERE name='Extra virgin olive oil'), 1),
('Burrata Mozzarella', (SELECT _id FROM ingredient WHERE name='Balsamic glaze'), 1);

-- Delicious Pizza Regina
INSERT INTO item_ingredient (item_name, ingredient_id, quantity) VALUES
('Delicious Pizza Regina', (SELECT _id FROM ingredient WHERE name='Tomato sauce'), 1),
('Delicious Pizza Regina', (SELECT _id FROM ingredient WHERE name='Mozzarella'), 1),
('Delicious Pizza Regina', (SELECT _id FROM ingredient WHERE name='Ham'), 1),
('Delicious Pizza Regina', (SELECT _id FROM ingredient WHERE name='Mushrooms'), 1),
('Delicious Pizza Regina', (SELECT _id FROM ingredient WHERE name='Oregano'), 1);

-- Homemade beef burger
INSERT INTO item_ingredient (item_name, ingredient_id, quantity) VALUES
('Homemade beef burger', (SELECT _id FROM ingredient WHERE name='Beef patty'), 1),
('Homemade beef burger', (SELECT _id FROM ingredient WHERE name='Brioche bun'), 1),
('Homemade beef burger', (SELECT _id FROM ingredient WHERE name='Cheddar cheese'), 1),
('Homemade beef burger', (SELECT _id FROM ingredient WHERE name='Lettuce'), 1),
('Homemade beef burger', (SELECT _id FROM ingredient WHERE name='Tomato'), 1),
('Homemade beef burger', (SELECT _id FROM ingredient WHERE name='Pickles'), 1),
('Homemade beef burger', (SELECT _id FROM ingredient WHERE name='Onion'), 1),
('Homemade beef burger', (SELECT _id FROM ingredient WHERE name='Special sauce Jim'), 1);

-- Half cooked tuna and octopus grilled on the plancha
INSERT INTO item_ingredient (item_name, ingredient_id, quantity) VALUES
('Half cooked tuna and octopus grilled on the plancha', (SELECT _id FROM ingredient WHERE name='Octopus'), 1),
('Half cooked tuna and octopus grilled on the plancha', (SELECT _id FROM ingredient WHERE name='Olive oil'), 1),
('Half cooked tuna and octopus grilled on the plancha', (SELECT _id FROM ingredient WHERE name='Lemon'), 1),
('Half cooked tuna and octopus grilled on the plancha', (SELECT _id FROM ingredient WHERE name='Garlic'), 1);


-- Enable UUID generation if not already
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------
-- Insert Allergens
-- ----------------------------
INSERT INTO allergen (_id, name, display)
VALUES
(uuid_generate_v4(), 'gluten', '🌾 Gluten'),
(uuid_generate_v4(), 'lactose', '🥛 Lactose'),
(uuid_generate_v4(), 'eggs', '🥚 Eggs'),
(uuid_generate_v4(), 'nuts', '🌰 Nuts'),
(uuid_generate_v4(), 'fish', '🐟 Fish'),
(uuid_generate_v4(), 'shellfish', '🦐 Shellfish'),
(uuid_generate_v4(), 'sesame', '🌿 Sesame'),
(uuid_generate_v4(), 'alcohol', '🍷 Alcohol')
ON CONFLICT (name) DO NOTHING;

-- ----------------------------
-- Insert ItemAllergen relationships
-- ----------------------------
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Homemade foie gras terrine', _id FROM allergen WHERE name = 'gluten';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Homemade foie gras terrine', _id FROM allergen WHERE name = 'alcohol';

INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Soft-boiled egg breaded with breadcrumbs and nuts', _id FROM allergen WHERE name = 'eggs';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Soft-boiled egg breaded with breadcrumbs and nuts', _id FROM allergen WHERE name = 'gluten';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Soft-boiled egg breaded with breadcrumbs and nuts', _id FROM allergen WHERE name = 'nuts';

INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Goat cheese foam from "Valbonne goat farm"', _id FROM allergen WHERE name = 'lactose';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Goat cheese foam from "Valbonne goat farm"', _id FROM allergen WHERE name = 'nuts';

INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Homemade dill salmon gravlax', _id FROM allergen WHERE name = 'fish';

INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Crab maki with fresh mango', _id FROM allergen WHERE name = 'shellfish';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Crab maki with fresh mango', _id FROM allergen WHERE name = 'sesame';

INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Burrata Mozzarella', _id FROM allergen WHERE name = 'lactose';

INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Delicious Pizza Regina', _id FROM allergen WHERE name = 'gluten';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Delicious Pizza Regina', _id FROM allergen WHERE name = 'lactose';

INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Lasagna al forno', _id FROM allergen WHERE name = 'gluten';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Lasagna al forno', _id FROM allergen WHERE name = 'lactose';

INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Homemade beef burger', _id FROM allergen WHERE name = 'gluten';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Homemade beef burger', _id FROM allergen WHERE name = 'lactose';

INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Half cooked tuna and octopus grilled on the plancha', _id FROM allergen WHERE name = 'fish';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Half cooked tuna and octopus grilled on the plancha', _id FROM allergen WHERE name = 'shellfish';

INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Brownie (home made)', _id FROM allergen WHERE name = 'gluten';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Brownie (home made)', _id FROM allergen WHERE name = 'eggs';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Brownie (home made)', _id FROM allergen WHERE name = 'lactose';

INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Valrhona chocolate declination with salted chocolate ice cream', _id FROM allergen WHERE name = 'lactose';

INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Marmalade of Menton''s lemon - Lemon cream - Limoncello jelly and sorbet - Homemade meringue', _id FROM allergen WHERE name = 'eggs';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Marmalade of Menton''s lemon - Lemon cream - Limoncello jelly and sorbet - Homemade meringue', _id FROM allergen WHERE name = 'lactose';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Marmalade of Menton''s lemon - Lemon cream - Limoncello jelly and sorbet - Homemade meringue', _id FROM allergen WHERE name = 'alcohol';

INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Dessert of fresh strawberries and vanilla mascarpone mousse', _id FROM allergen WHERE name = 'lactose';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Dessert of fresh strawberries and vanilla mascarpone mousse', _id FROM allergen WHERE name = 'eggs';

INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Speculoos tiramisu', _id FROM allergen WHERE name = 'gluten';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Speculoos tiramisu', _id FROM allergen WHERE name = 'lactose';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Speculoos tiramisu', _id FROM allergen WHERE name = 'eggs';

INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Spritz', _id FROM allergen WHERE name = 'alcohol';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Margarita', _id FROM allergen WHERE name = 'alcohol';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Tequila sunrise', _id FROM allergen WHERE name = 'alcohol';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Mojito', _id FROM allergen WHERE name = 'alcohol';
INSERT INTO item_allergen (_id, item_name, allergen_id)
SELECT uuid_generate_v4(), 'Martini', _id FROM allergen WHERE name = 'alcohol';
