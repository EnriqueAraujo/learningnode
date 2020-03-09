package com.falcon.api.resource.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UsuarioResource {

	@JsonProperty("id_usuario")
	private Long id;
	
	@JsonProperty("nome_usuario")
	private String nome;
	
	@JsonProperty("email_usuario")
	private String email;
	
	@JsonProperty("senha_usuario")
	private String senha;
	
	
	public UsuarioResource(Long id, String nome, String email, String senha) {
		
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.senha = senha;
	}

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	
	@Override
	public String toString() {
		return "UserResource [name=" + nome + ", email=" + email + "]";
	}
	
}
