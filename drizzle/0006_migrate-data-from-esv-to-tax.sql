-- Custom SQL migration file, put you code below! --
insert into
    tax (name, type, sum, date)
select
    'esv',
    'fixed',
    sum,
    date
from
    esv