# ✈️ Sistema de Passagens Aéreas

## 📌 Sobre o Projeto

Sistema de gerenciamento de passagens aéreas desenvolvido em JavaScript utilizando Node.js e SQLite. O projeto permite o cadastro e gerenciamento de companhias aéreas, trechos de viagem e cupons de desconto através de um menu interativo executado no terminal.

Este projeto foi desenvolvido com fins educacionais para praticar conceitos de programação orientada a objetos, manipulação de banco de dados SQLite e desenvolvimento de aplicações em linha de comando (CLI).

---

## 🚀 Funcionalidades

### Gerenciamento de Trechos

* Cadastro de trechos de viagem
* Listagem de trechos cadastrados
* Edição de informações dos trechos
* Exclusão de trechos

### Gerenciamento de Cupons

* Cadastro de cupons de desconto
* Listagem de cupons cadastrados
* Edição de cupons
* Exclusão de cupons

### Gerenciamento de Companhias

* Cadastro de companhias aéreas
* Associação de trechos e cupons a uma companhia

---

## 🛠️ Tecnologias Utilizadas

* Node.js
* JavaScript
* SQLite
* Better-SQLite3
* Prompt-Sync

---

## 📂 Estrutura do Banco de Dados

### Tabela: Companhia

| Campo       | Tipo    |
| ----------- | ------- |
| idCompanhia | INTEGER |
| nome        | TEXT    |
| anoFundacao | INTEGER |

### Tabela: Trecho

| Campo        | Tipo    |
| ------------ | ------- |
| idTrecho     | INTEGER |
| idCompanhia  | INTEGER |
| origem       | TEXT    |
| destino      | TEXT    |
| valor        | REAL    |
| numPassagens | INTEGER |

### Tabela: Cupom

| Campo              | Tipo    |
| ------------------ | ------- |
| idCupom            | INTEGER |
| idCompanhia        | INTEGER |
| codigo             | TEXT    |
| percentualDesconto | REAL    |
| numeroCupons       | INTEGER |

---

## 📖 Conceitos Praticados

* Estruturas de repetição
* Funções
* Modularização de código
* CRUD (Create, Read, Update, Delete)
* Banco de dados SQLite
* Relacionamento entre tabelas
* Manipulação de dados em JavaScript
* Aplicações de terminal (CLI)

---

## 🎓 Objetivo Acadêmico

Projeto desenvolvido durante as aulas do curso MaisTI com o objetivo de aplicar conceitos de desenvolvimento de software, persistência de dados e organização de sistemas utilizando JavaScript e banco de dados relacional.

---

## 👨‍💻 Autor

Desenvolvido para fins acadêmicos e de aprendizado em desenvolvimento de software.

