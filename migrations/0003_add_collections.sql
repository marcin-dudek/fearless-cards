-- Migration number: 0003 	 2024-04-05T11:17:09.421Z
drop table if exists teams;

create table if not exists collection (
    id text not null primary key,
    owner text not null,
    is_public boolean not null,
    foreign key (owner) references user(id)
);

create table if not exists collection_team (
    collection_id text not null,
    team_id text not null,
    foreign key (collection_id) references collection(id),
    foreign key (team_id) references team(id)
);

create table if not exists team (
  id text primary key,
  code text not null,
  tags text
);