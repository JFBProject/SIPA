package com.cat.os.common.constant;

public class OmUDBConstant {

	public static final String OM_ERROR = "OM_ERROR";
	public static final String OM_STATUS_FLOW = "OM_STATUS_FLOW";
	public static final String ACTION_TYPE_SUBMIT = "SUBMIT";
	public static final String ACTION_TYPE_ADD_GROUP = "ADD_GROUP";
	public static final String ACTION_TYPE_DEL_GROUP = "DEL_GROUP";
	public static final String AGENT_ROLE_LKP = "FE9D06A150669B418916D6252A715621";

	
	public static class FIELD {
		public static final String ORDER_ID_COLUMN = "orderId";
		public static final String SERVICE_ITEM_ID_COLUMN = "serviceItemId";
		public static final String STATUS_DISPLAY_COLUMN = "statusDisplay";
		
		public static final String FIRST_NAME_COLUMN = "firstName";
		public static final String LAST_NAME_COLUMN = "lastName";
		public static final String EMP_ID_COLUMN = "empId";
		public static final String AGENT_NAME_COLUMN = "agentName";
		
		public static final String ORDER_ID = "o.id";
		public static final String SERVICE_ITEM_ID = "ovi.id";
		public static final String STATUS_DISPLAY = "orst.status";
		
		public static final String FIRST_NAME = "a.first_name";
		public static final String LAST_NAME = "a.last_name";
		public static final String EMP_ID = "a.emp_id";
		public static final String AGENT_NAME = "a.agent_name";
	}
	
	public static class OM_ORDER_CHANGE_STATUS {
		public static final String CANCELLED = "1017";
	}

	public static class BPM_REST_API_TERMINAL_INSTANCE {
		public static final String STATE_TERMINATED = "STATE_TERMINATED";
	}

	public static class TERRITORY_FLAG {
		public static final Integer ACTIVE = 0;
		public static final Integer INACTIVE = 1;
	}
	
	
	public static class OM_ERROR_STATUS {
		public static final String USER_EXIST = "E001";
	}
	
	public static class OM_BASIC_LDAP_GROUPS {
		public static final String L_SALES_BACK_DATE_NEW = "l_Sales_Back_Date_NEW";
		public static final String L_SALES_BACK_DATE_OTHERS = "l_Sales_Back_Date_OTHERS";
		public static final String L_SALES_CA_BA = "l_Sales_CA_BA";
		public static final String L_SALES_ORDER = "l_Sales_Order";
		public static final String L_SALES_REPORT = "l_Sales_Report";
	}
}
