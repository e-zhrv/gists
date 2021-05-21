SELECT 
  RDate, 
  Phone, 
  sum(Sum) as Sum, 
  sum(SumRefund) as SumRefund, 
  max(Date) as maxTime 
FROM 
  ga_1c_matching.ga_stored_matched_payments_and_clientids 
WHERE 
  ImportToGA_Status = '0' AND 
  ((ClientIDs_json LIKE '%_ga":null%' AND ClientIDs_json LIKE '%_ga":"GA%') OR  ClientIDs_json NOT LIKE '%_ga":null%')  
GROUP BY 
  Phone, 
  RDate;
