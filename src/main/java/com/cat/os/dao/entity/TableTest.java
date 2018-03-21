package com.cat.os.dao.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the table_test database table.
 * 
 */
@Entity
@Table(name="table_test")
@NamedQuery(name="TableTest.findAll", query="SELECT t FROM TableTest t")
public class TableTest implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private int amount;

	private int des;

	private int name;

	public TableTest() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getAmount() {
		return this.amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public int getDes() {
		return this.des;
	}

	public void setDes(int des) {
		this.des = des;
	}

	public int getName() {
		return this.name;
	}

	public void setName(int name) {
		this.name = name;
	}

}