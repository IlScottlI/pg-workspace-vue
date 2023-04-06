def insert_outstanding_work_details(outstandingWorkTypeIdParam,workCenterIdParam,completedByParam,createdEmployeeIdParam,taskIdParam,serialNumberParam,descriptionParam,departmentIdParam):
	import sys
	from datetime import datetime  
	import time  
	
	
	input_params = {"Serial Number":str(serialNumberParam)}
	
	try:
		createdDateParam=dateFormatting.DateToUTC()
		queryPath="OutstandingWork/insertOutstandingWork"
		outstandingWorkTypeIdparamInt=int(outstandingWorkTypeIdParam)
		createdEmployeeIdParamInt=int(createdEmployeeIdParam)
		
		dbName= config.getSpokeDBName()
		time_stamp = time.time()
		date_time = datetime.fromtimestamp(time_stamp)
		str_date_time = date_time.strftime("%d-%m-%Y %H:%M:%S.%f")
		queryParams={
			"outStandingWorkTypeID":outstandingWorkTypeIdparamInt,
			"workCenterID":str(workCenterIdParam),
			"completedBy":completedByParam,
			"createdByEmployeeID":createdEmployeeIdParamInt,
			"taskID":str(taskIdParam),
			"serialnumber":serialNumberParam,
			"description":descriptionParam + str(' SF ') + str_date_time,
			"deptID":str(departmentIdParam),
			"createdDate":createdDateParam,
			"database":dbName
			}
		response=system.db.runSFNamedQuery(queryPath,queryParams)

		Util.custom_logger.log_to_sql('insert_outstanding_work_details-SF',response,102,'API/v1/OutstandingWorkDetails/')
		
		if (str(response) == "True"):
			return 1
		else: 
			return 0
			
		
	except:        
			logger_name = "insert_outstanding_work_details"
			error_message = str(input_params) + str(sys.exc_info())
			Util.custom_logger.log_error(logger_name,error_message)
