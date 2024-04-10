-- Migration number: 0001 	 2024-03-29T19:56:46.768Z
create table if not exists user (
  id text not null primary key,
  username text not null,
  auth_provider text not null,
  avatar_url text not null,
  foreign_id text not null
);

create table if not exists session (
  id text not null primary key,
  expires_at integer not null,
  user_id text not null,
  foreign key (user_id) references user(id)
);
