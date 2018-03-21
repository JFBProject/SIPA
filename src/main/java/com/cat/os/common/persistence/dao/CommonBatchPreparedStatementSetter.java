package com.cat.os.common.persistence.dao;

import java.sql.PreparedStatement;
import java.util.List;

/**
 * Batch update callback class used by the {@link CommonJdbcDao#executeBatch(String, CommonBatchPreparedStatementSetter)} class.
 *
 * @author: Taechapon Himarat (Su)
 * @since November 9, 2017
 */
public interface CommonBatchPreparedStatementSetter<T> {
	
	/**
	 * Return the List of the batch process.
	 * @return the List for execute in the batch process
	 */
	public List<T> getBatchObjectList();
	
	/**
	 * Prepare object in {@link getBatchObjectList} to Array of Object for using in batch process
	 * @param obj the Object will be using in {@link CommonJdbcDao#preparePs(PreparedStatement, Object[])}
	 * @return the Array of Object
	 */
	public Object[] toObjects(T obj);
	
	/**
	 * Return the size of the batch for call {@link PreparedStatement#executeUpdate()} method.
	 * Default 1000
	 * @return the number for execute in the batch process
	 */
	public default int getExecuteSize() {
		return 1000;
	}
	
}
