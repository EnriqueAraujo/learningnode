package com.falcon.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.falcon.api.datasource.model.Usuario;
import com.falcon.api.exception.UsuarioNotFoundException;
import com.falcon.api.resource.model.UsuarioResource;
import com.falcon.api.service.UsuarioService;

@RestController
@RequestMapping(value = "/api")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	
	@GetMapping("/usuarios")
	public List<Usuario> listarTodos(){
		return usuarioService.listarTodos();
	}
	
	@GetMapping("usuario/{id}")
	public Usuario buscarUsuario(@PathVariable(value = "id", required = true) Long id) throws UsuarioNotFoundException {
		return usuarioService.buscarUsuario(id);
			
	}
	
	@PostMapping(path = "/usuario/criar")
	public void criarUsuario(@RequestBody UsuarioResource usuario){
		usuarioService.criarUsuario(usuario);
	}
	
	@DeleteMapping(path = "/usuario/deletar/{id}")
	public void deletarUsuario(@PathVariable(name = "id", required = true) Long id) throws UsuarioNotFoundException {
		usuarioService.deletarUsuario(id);
	}
}
