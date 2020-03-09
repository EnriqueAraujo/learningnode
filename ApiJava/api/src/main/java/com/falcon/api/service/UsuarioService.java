package com.falcon.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.falcon.api.datasource.model.Usuario;
import com.falcon.api.exception.UsuarioNotFoundException;
import com.falcon.api.repository.UsuarioRepository;
import com.falcon.api.resource.model.UsuarioResource;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	
	public List<Usuario> listarTodos(){
		List<Usuario> listaUsuarios = usuarioRepository.findAll();
		
		return listaUsuarios;
	}
	
	public Usuario buscarUsuario(Long id) throws UsuarioNotFoundException {
		Optional<Usuario> optionalUsuario = getOptional(id);
		Usuario usuario = null;
		
		if(!optionalUsuario.isPresent()) {
			throw new UsuarioNotFoundException("Usuario não encontrado atravé do ID: " +id);
		}else {
			usuario = optionalUsuario.get();
		}
		
		return usuario;
	}
	
	
	private Optional<Usuario> getOptional(Long id){
		Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
		
		return optionalUsuario;
	}

	public void criarUsuario(UsuarioResource usuarioResource) {
		Usuario usuario = new Usuario();
		usuario.setEmail(usuarioResource.getEmail());
		usuario.setNome(usuarioResource.getNome());
		usuario.setSenha(usuarioResource.getSenha());
		
		usuarioRepository.saveAndFlush(usuario);
	}
	
	public void deletarUsuario(Long id) throws UsuarioNotFoundException{
		Optional<Usuario> optionalUsuario = getOptional(id);
		if (!optionalUsuario.isPresent()) {
			throw new UsuarioNotFoundException("Usuario não encontrado através do ID: " +id);
		} else {
			usuarioRepository.delete(optionalUsuario.get());
		}
	}
	
}
