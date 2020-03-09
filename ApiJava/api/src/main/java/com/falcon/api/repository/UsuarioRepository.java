package com.falcon.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.falcon.api.datasource.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

}
