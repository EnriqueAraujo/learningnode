package com.falcon.api.resource.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

public class MovimentoResource {
	
	@JsonProperty("nome_movimento")
	private String nome;
	
	@JsonProperty("descricao_movimento")
	private String descricao;
	
	@JsonProperty("valor_movimento")
	private double valor;
	
	@JsonProperty("data_movimento")
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date data;
	
	/*
	@JsonProperty("usuario_movimento")
	private String usuario;
	*/
	
	@JsonProperty("tipo_movimento")
	private Long tipo;
	
	@JsonProperty("categoria_movimento")
	private Long categoria;

	
	
	
	public MovimentoResource(String nome, String descricao, double valor, Date data, String usuario, Long tipo,
			Long categoria) {
		
		this.nome = nome;
		this.descricao = descricao;
		this.valor = valor;
		this.data = data;
		//this.usuario = usuario;
		this.tipo = tipo;
		this.categoria = categoria;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public double getValor() {
		return valor;
	}

	public void setValor(double valor) {
		this.valor = valor;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	/*
	public String getUsuario() {
		return usuario;
	}
	
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	*/

	public Long getTipo() {
		return tipo;
	}

	public void setTipo(Long tipo) {
		this.tipo = tipo;
	}

	public Long getCategoria() {
		return categoria;
	}

	public void setCategoria(Long categoria) {
		this.categoria = categoria;
	}
	
	
}
