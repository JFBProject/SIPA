//package com.cat.os.dao.mysql;
//
//import java.sql.SQLException;
//import java.util.Arrays;
//import java.util.List;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.stereotype.Repository;
//
//import com.cat.os.common.persistence.dao.CommonBatchPreparedStatementSetter;
//import com.cat.os.common.persistence.dao.CommonJdbcDao;
//import com.cat.os.common.persistence.util.SqlGeneratorUtils;
//import com.cat.os.dao.entity.IbacssPaymentDataTaxInvSummaryWt;
//
//@Repository
//public class IbacssTaxSummaryWtJdbcRepository {
//	
//	private static final Logger log = LoggerFactory.getLogger(IbacssTaxSummaryWtJdbcRepository.class);
//	
//	@Autowired
//	@Qualifier("systemCommonJdbcDao")
//	private CommonJdbcDao commonJdbcDao;
//	
//	public int[][] batchInsert(List<IbacssPaymentDataTaxInvSummaryWt> taxInvSummaryWtList) throws SQLException {
//		log.info("batchInsert");
//		
//		String sql = SqlGeneratorUtils.genSqlInsert("`ibacss_payment_data_tax_inv_summary_wt`", Arrays.asList(
//			"`tx_date`",
//			"`bill_order_number`",
//			"`rental`",
//			"`usage`",
//			"`total_amount_ex_vat`",
//			"`vat_amount`",
//			"`rental_wt`",
//			"`usage_wt`",
//			"`num_of_records`"
//		));
//		
//		CommonBatchPreparedStatementSetter<IbacssPaymentDataTaxInvSummaryWt> bs = new CommonBatchPreparedStatementSetter<IbacssPaymentDataTaxInvSummaryWt>() {
//			@Override
//			public List<IbacssPaymentDataTaxInvSummaryWt> getBatchObjectList() {
//				return taxInvSummaryWtList;
//			}
//			
//			@Override
//			public Object[] toObjects(IbacssPaymentDataTaxInvSummaryWt obj) {
//				return new Object[] {
//					obj.getTxDate(),
//					obj.getBillOrderNumber(),
//					obj.getRental(),
//					obj.getUsage(),
//					obj.getTotalAmountExVat(),
//					obj.getVatAmount(),
//					obj.getRentalWt(),
//					obj.getUsageWt(),
//					obj.getNumOfRecords()
//				};
//			}
//		};
//		
//		int result[][] = commonJdbcDao.executeBatch(sql, bs);
//		
//		return result;
//	}
//	
//}
