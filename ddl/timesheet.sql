CREATE TABLE IF NOT EXISTS timesheets (
	id									serial				 NOT NULL,
  start_time      		timestamptz    NOT NULL,
  end_time        		timestamptz,
	emp_id          		serial 				 NOT NULL,
	status							int						 NOT NULL,

	PRIMARY KEY (id),
  FOREIGN KEY (emp_id)      			 REFERENCES employees (id),
);
