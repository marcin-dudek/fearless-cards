-- Migration number: 0003 	 2024-04-09T07:52:07.781Z
create unique index user_id on user (id);

create index collection_owner on collection (owner);

create index team_collection on team (collection_id);