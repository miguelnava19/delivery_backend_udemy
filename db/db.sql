create table users
(
    id             bigserial primary key,
    email          varchar(255) not null unique,
    password       varchar(255) not null unique,
    nombre         varchar(255) not null,
    apellido       varchar(255) not null,
    telefono       varchar(80)  not null unique,
    image          varchar(255) null,
    is_available   boolean null,
    session_tooken varchar(255) null,
    create_at      timestamp(0) not null,
    updated_at     timestamp(0) not null
);
