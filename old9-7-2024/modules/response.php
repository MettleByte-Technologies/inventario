<?php
    $json_data = array(
      "current"            =&gt; intval(10), 
      "rowCount"            =&gt; 5,      
      "total"    =&gt; intval(5),
      "rows"            =&gt; '[["id":1,"employee_name":"name 1", "employee_salary":100, "employee_age":20]]'   // total data array
      );


var_dump($json_data);

echo json_encode($json_data);
?>