package com.falcon.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.falcon.api.datasource.model.Movimento;

public interface MovimentoRepository extends JpaRepository<Movimento, Long>{

}
