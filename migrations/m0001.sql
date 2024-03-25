create table if not exists teams (
  id text primary key,
  code text not null,
  tags text
);


create table user (
    id text not null primary key
)

create table session (
    id text not null primary key,
    expires_at integer not null,
    user_id text not null,
    foreign key (user_id) references user(id)
)
