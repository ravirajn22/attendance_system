CREATE TABLE IF NOT EXISTS employees (
	id SERIAL NOT NULL,
	first_name text	NOT NULL,
	work_email text NOT NULL,
	mobile text,
	PRIMARY KEY (id)
);
