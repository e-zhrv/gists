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
  _ga is not null 
GROUP BY 
  Phone, 
  RDate;
