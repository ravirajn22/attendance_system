CREATE TABLE IF NOT EXISTS timesheets (
	id									serial				  NOT NULL,
  start_time      		timestamp    		NOT NULL,
  end_time        		timestamp,
	emp_id          		int 				 	  NOT NULL,
	in_latitude         numeric(12, 8)  NOT NULL,
	in_longitude				numeric(12, 8)  NOT NULL,
	out_latitude				numeric(12, 8),
	out_longitude				numeric(12, 8),
	in_image_url				text			      NOT NULL,
	out_image_url				text,


	PRIMARY KEY (id),
  FOREIGN KEY (emp_id)      			 REFERENCES employees (id)
);


-- gps location
-- photo
