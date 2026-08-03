# Mapa do Conhecimento Cristão

> Plataforma para construção e exploração de mapas de conhecimento relacionados ao cristianismo.

## Sobre o sistema

O **Mapa do Conhecimento Cristão** é uma plataforma que permite ao usuário construir sua própria linha de estudos por meio de grafos interativos.

O sistema relacionará pessoas, acontecimentos históricos, doutrinas, tradições, obras, documentos, textos bíblicos e diferentes áreas do conhecimento conectadas ao cristianismo com base no estudo do usuário.

Cada elemento será representado como um nó do grafo, enquanto as conexões demonstrarão como esses elementos se relacionam.

O módulo central é o grafo de conhecimento, que funcionará como uma grande rede de conexões. Dentro dele, o usuário poderá criar submapas temáticos (como "Cristianismo primitivo", "Reforma Protestante" ou "Filosofia e fé"), dando uma visão macro do seu aprendizado. Cada submapa poderá conectar‑se a outros, formando um ecossistema de conhecimento pessoal e expansível.

Em cada nó o usuário pode desenvolver suas anotações e terá apoio de classificações que é o tipo do nó, como biografia, fontes históricas, debates, doutrina e conceitos, geografia histórica, concílio ou acontecimento ou textos biblícos.

Exemplo:

```text 
[Gamaliel]
    └── INSTRUIU ──> [Paulo de Tarso]
            ├── Explicação da relação
            └── Fonte: Atos 22:3

            
[Agostinho]
   ├── POSSUI BIOGRAFIA
   ├── ESCREVEU ──> [Confissões]
   ├── PARTICIPOU DE ──> [Debate sobre a graça]
   ├── INFLUENCIOU ──> [Tradições cristãs]
   └── RELACIONA‑SE COM ──> [Doutrina do pecado original]

 Outro exemplo:  
 
    [Astronomia]
        └── RELACIONA-SE COM ──> [Calendário cristão]
                ├── Contexto histórico
                ├── Interpretação
                └── Fontes utilizadas

```
                


O objetivo é permitir que o usuário organize seus estudos de maneira visual, estruturada e fundamentada, identificando relações entre diferentes períodos, autores, conceitos e áreas do conhecimento.

A plataforma também buscará preservar a pluralidade das tradições cristãs. Diferentes interpretações poderão ser apresentadas juntamente com seus respectivos contextos, argumentos e fontes.


### Objetivos

   Permitir ferramentas para o usuario: 

*  Construir mapas de conhecimento cristão visuais, estruturados e fundamentados.

   * Relacionar o cristianismo com história, filosofia, ciência, arqueologia e outras áreas.

   * Organizar pessoas, obras, doutrinas, movimentos e acontecimentos.

   * Registrar explicações e fontes em cada relação.

   * Facilitar a exploração de conexões diretas e indiretas.

   * Comparar interpretações de diferentes tradições.

   * Disponibilizar visualizações históricas, geográficas e cronológicas.

   * Incentivar estudos rastreáveis e respeitar a pluralidade das tradições cristãs.

   ---

### Classificações disponíveis

- **Biografia** — para pessoas: período, resumo, obras, tradição, linha do tempo pessoal etc.
- **Debate** — questões com diferentes perspectivas, argumentos, contra‑argumentos e fontes.
- **Fonte Histórica** — obras, manuscritos, artigos, artefatos; classificação extra como fonte primária, secundária, hipótese do autor etc.
- **Tradição, Movimento ou Corrente** — vertentes cristãs (luteranismo, pentecostalismo, patrística…).
- **Doutrina ou Conceito** — definições, origem, contexto histórico, tradições que o interpretam.
- **Geografia Histórica** — cidades, rotas, impérios, locais de concílios.
- **Concílio ou Acontecimento** — eventos históricos, participantes, decisões, consequências.
- **Texto Bíblico** — referências às Escrituras e suas relações com outros nós.

Cada nó pode carregar **múltiplas classificações** (ex.: uma pessoa que também é fonte histórica).  
Os **relacionamentos** também são ricos: você define tipo, direção, explicação, contexto histórico, fontes e observações.


### Submapas: a visão macro

Os submapas são agrupamentos temáticos que você cria livremente.  
Eles permitem enxergar grandes áreas do seu estudo sem se perder nos detalhes.  
Submapas podem conectar‑se entre si — por exemplo, “Cristianismo primitivo” ligando‑se a “Judaísmo do Segundo Templo” — , o usuario fundamentar a relação mostrando como os temas se relacionam na sua jornada de conhecimento.


## Público-alvo

A plataforma após ser finalizada poderá ser utilizada por:

* Estudantes;
* pesquisadores;
* professores;
* teólogos;
* historiadores;
* líderes religiosos;
* Pessoas interessadas na história do cristianismo;

---


## Tecnologias

O sistema será desenvolvido utilizando:

* **Java** — linguagem utilizada no desenvolvimento do back-end.
* **Spring Boot** — framework utilizado para construção da API, regras de negócio, segurança e integração com os bancos de dados.
* **React** — biblioteca utilizada para desenvolvimento da interface e visualização interativa dos grafos.
* **MySQL** — banco de dados relacional principal, responsável pelo armazenamento de usuários, mapas, conteúdos, fontes e demais dados transacionais.
* **Neo4j** — banco de dados orientado a grafos, utilizado para consultas mais complexas, como exploração de caminhos, conexões indiretas, recomendações e análise dos relacionamentos entre os elementos.

### Arquitetura do Banco de Dados

```text
MySQL
├── Usuários e permissões
├── Mapas de conhecimento
├── Conteúdos editoriais
├── Fontes históricas
└── Dados transacionais

Neo4j
├── Nós e relacionamentos
├── Caminhos entre elementos
├── Conexões diretas e indiretas
├── Recomendações
└── Consultas avançadas de grafos
```

O MySQL será utilizado como banco de dados principal, enquanto o Neo4j funcionará como tecnologia especializada para consultas e análises complexas sobre o grafo de conhecimento.

A decisão técnica de usar ambos os banco é pensando em fins de aprendizagem.

## Status do projeto

O projeto encontra-se em fase de planejamento e definição dos requisitos.
