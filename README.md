# RespiraAi - Aplicação Flask

## Descrição

O RespiraAi é uma aplicação web desenvolvida em Flask para exercícios de respiração e bem-estar. A aplicação foi modificada para usar Bootstrep.

### Modificações Realizadas

1. **Substituição de JavaScript por Flask**:
   - Removidos arquivos JS de login, cadastro e exercícios
   - Implementadas rotas Flask para processar formulários
   - Criada API para estatísticas usando Flask

2. **Atualização dos Templates HTML**:
   - Links de navegação agora usam `url_for()` do Flask
   - Formulários modificados para usar métodos POST do Flask
   - CSS links atualizados para usar `url_for('static')`

3. **Sistema de Sessões**:
   - Implementado sistema de login/logout com sessões Flask
   - Histórico de práticas vinculado ao usuário logado

4. **Banco de Dados**:
   - Dados armazenados (práticas e tempo)
   - Exercícios 
   - Usuários

## Funcionalidades Principais

### Sistema de Usuários
- Cadastro de novos usuários
- Login/logout com sessões
- Dados armazenados em memória

### Exercícios de Respiração
- 3 exercícios pré-definidos:
  - Respiração 4-7-8 (3 min)
  - Respiração Quadrada (5 min)
  - Respiração Alternada (5 min)
  - Entre outros
  - Adicionar mais exercícios

### Histórico e Estatísticas
- Registro de práticas realizadas
- Estatísticas por usuário
- Visualização de histórico

