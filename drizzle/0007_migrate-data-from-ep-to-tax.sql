-- Custom SQL migration file, put you code below! --
-- Custom SQL migration file, put you code below! --
insert into
    tax (name, type, sum, date)
select
    'ep',
    'percent',
    sum,
    date
from
    ep