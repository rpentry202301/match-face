INSERT INTO answer_requests (
    id,
    user_id,
    administrator_id,
    project_id,
    is_answered,
    request_at,
    deadline,
    answer_request_group_id,
    created_user,
    created_at,
    update_user,
    update_at
  )
VALUES (
    id:integer,
    user_id:integer,
    administrator_id:integer,
    project_id:integer,
    is_answered:boolean,
    'request_at:timestamp without time zone',
    'deadline:timestamp without time zone',
    answer_request_group_id:integer,
    'created_user:character varying',
    'created_at:timestamp without time zone',
    'update_user:character varying',
    'update_at:timestamp without time zone'
  );
