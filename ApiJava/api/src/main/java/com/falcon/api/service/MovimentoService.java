package com.falcon.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.falcon.api.datasource.model.Movimento;
import com.falcon.api.repository.MovimentoRepository;
import com.falcon.api.resource.model.MovimentoResource;

@Service
public class MovimentoService {
	@Autowired
	private MovimentoRepository movimentoRepository;
	
	public List<Movimento> listarTodos(){
		List<Movimento> listaMovimentos = movimentoRepository.findAll();
		
		return listaMovimentos;
	}
	
	public void criarMovimento(MovimentoResource movimentoResource) {
		Movimento movimento = new Movimento();	
		movimento.setNome(movimentoResource.getNome());
		movimento.setDescricao(movimentoResource.getDescricao());
		movimento.setValor(movimentoResource.getValor());
		movimento.setData(movimentoResource.getData());
		
		movimentoRepository.saveAndFlush(movimento);
		
	}
}
