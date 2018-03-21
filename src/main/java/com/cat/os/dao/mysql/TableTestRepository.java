package com.cat.os.dao.mysql;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.cat.os.dao.entity.TableTest;

public interface TableTestRepository extends CrudRepository<TableTest, Integer> {
	
	  Page<TableTest> findAll(Pageable pageable);

}
