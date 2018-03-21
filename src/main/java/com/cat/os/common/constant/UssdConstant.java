package com.cat.os.common.constant;

public class UssdConstant {

	public static final String E001_CODE = "E001";
	public static final String E002_CODE = "E002";
	public static final String E003_CODE = "E003";
	public static final String E004_CODE = "E004";
	public static final String E999_CODE = "E999";
	
	public static final String STATUS_CODE_00 = "00";
	public static final String STATUS_CODE_10 = "10";
	public static final String STATUS_CODE_20 = "20";
	public static final String STATUS_CODE_30 = "30";
	
	public static final String STATUS_SUCCESS = "สำเร็จ";
	public static final String STATUS_FAIL = "ไม่สำเร็จ";

	public static final String REQUEST = "REQ";
	public static final String RESPONSE = "RES";

	public static final String USSD_ERROR_GROUP_CODE = "USSD_ERROR";
	
	public static final String USSD_TYPE = "6";
	
	public static final String USSD_BATCH_PROCESS = "BATCH PROCESS";
	
	public static final String USSD_EMAIL_FAIL_TEMPLATE = "USSD_BATCH_FAIL";
	
	public static class USSD_STATUS {
		public static int ON = 1;
		public static int OFF = 0;
	}	
	
	public static class STATUS {
		public static int INACTIVE = 1;
		public static int ACTIVE = 0;
	}
	
	public static class USSD_ACTION {
		public static String ACTION_DELETE = "ลบ";
		public static String ACTION_ACTIVE = "เปิด";
		public static String ACTION_INACTIVE = "ปิด";
		public static String ACTION_NEW = "เพิ่มบริการ";
		public static String ACTION_EDIT = "แก้ไขบริการ";
		public static String ACTION_CANCEL = "ยกเลิกการตั้งต่าเวลา";
	}
	
}
