package com.falcon.api.datasource.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "movimento")
public class Movimento {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_movimento")
	private Long id;
	
	@Column(name = "nome_movimento")
	private String nome;
	
	@Column(name = "descricao_movimento")
	private String descricao;
	
	@Column(name = "valor_movimento")
	private double valor;
	
	@Column(name = "data_movimento")
	private Date data;
	
	@ManyToOne
	@JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
	private Usuario usuario;
	
	/*
	@ManyToOne
	@JoinColumn(name = "id_categoria", referencedColumnName = "id_categoria")
	private Long CategoriaId;
	
	@ManyToOne
	@JoinColumn(name = "id_tipo", referencedColumnName = "id_tipo")
	private Long tipoId;
	*/
	
	
	
	
	public Movimento(Long id, String nome, String descricao, double valor, Date data, Usuario usuario, Long categoriaId,
			Long tipoId) {
		
		this.id = id;
		this.nome = nome;
		this.descricao = descricao;
		this.valor = valor;
		this.data = data;
		this.usuario = usuario;
		//CategoriaId = categoriaId;
		//this.tipoId = tipoId;
	}
	
	public Movimento() {
		
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

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	/*
	public Long getCategoriaId() {
		return CategoriaId;
	}

	public void setCategoriaId(Long categoriaId) {
		CategoriaId = categoriaId;
	}

	public Long getTipoId() {
		return tipoId;
	}

	public void setTipoId(Long tipoId) {
		this.tipoId = tipoId;
	}
	
	*/
}
