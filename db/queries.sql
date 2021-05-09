CREATE TABLE backscratchers (
    id serial primary key,
    item_name text,
    item_description text,
    item_size text[],
    item_cost text
);

drop table backscratchers

insert into backscratchers (item_name, item_description, item_size, item_cost)
values ('testing', 'description test', array ['XL'], '$5.00') returning *

select * from backscratchers

update backscratchers set item_size = array ['S'] where id = 1 returning *

delete from backscratchers where id = 1 returning *