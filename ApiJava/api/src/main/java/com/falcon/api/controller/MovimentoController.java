package com.falcon.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.falcon.api.datasource.model.Movimento;
import com.falcon.api.resource.model.MovimentoResource;
import com.falcon.api.service.MovimentoService;

@RestController
@RequestMapping(value = "/api")
public class MovimentoController {

	@Autowired
	private MovimentoService movimentoService;
	
	@GetMapping("/movimentos")
	public List<Movimento> listarTodos(){
		
		return movimentoService.listarTodos();
	}
	
	@PostMapping("/movimento/criar")
	public void criarMovimento(@RequestBody MovimentoResource movimento) {
		movimentoService.criarMovimento(movimento);
	}
}
