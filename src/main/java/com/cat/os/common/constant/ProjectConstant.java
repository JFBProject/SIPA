package com.cat.os.common.constant;

public class ProjectConstant {

	public static class ApplicationID {
		public static String APPLICATION_OS = "OS";
	}

	public static class Profiles {
		public static final String USSD = "ussd";
		public static final String BILLING = "billing";
		public static final String OMUDB = "omudb";
		public static final String PROMPTPAY = "promptpay";
	}

	public static class TransactionManagerRef {
		public static final String DEFAULT_MYSQL = "transactionManager";
		public static final String OMUDB_DB2 = "omudbTransactionManager";
		public static final String USSD_ORACLE = "ussdOracleEntityManagerFactory";
		public static final String BILLING_ORACLE = "billingTransactionManager";
	}

	public static class PARAMETER_CONFIG {
		public static final String OM_LDAP_UID_NUMBER = "OM_LDAP_UID_NUMBER";
	}

}
