# Mapa do Conhecimento Cristão

> Plataforma para construção e exploração de mapas de conhecimento relacionados ao cristianismo.

## Sobre o sistema

O **Mapa do Conhecimento Cristão** é uma plataforma que permite ao usuário construir sua própria linha de estudos por meio de grafos interativos.

O sistema relacionará pessoas, acontecimentos históricos, doutrinas, tradições, obras, documentos, textos bíblicos e diferentes áreas do conhecimento conectadas ao cristianismo.

Cada elemento será representado como um nó do grafo, enquanto as conexões demonstrarão como esses elementos se relacionam.

Exemplo:

```text
[Gamaliel]
    └── INSTRUIU ──> [Paulo de Tarso]
            ├── Explicação da relação
            └── Fonte: Atos 22:3
```

Outro exemplo:

```text
[Astronomia]
    └── RELACIONA-SE COM ──> [Calendário cristão]
            ├── Contexto histórico
            ├── Interpretação
            └── Fontes utilizadas
```

O objetivo é permitir que o usuário organize seus estudos de maneira visual, estruturada e fundamentada, identificando relações entre diferentes períodos, autores, conceitos e áreas do conhecimento.

A plataforma também buscará preservar a pluralidade das tradições cristãs. Diferentes interpretações poderão ser apresentadas juntamente com seus respectivos contextos, argumentos e fontes.

---

## Objetivos

* Permitir a construção de mapas de conhecimento cristão.
* Relacionar o cristianismo com história, filosofia, ciência, arqueologia e outras áreas.
* Organizar pessoas, obras, doutrinas, movimentos e acontecimentos.
* Registrar a explicação e as fontes de cada relação.
* Facilitar a exploração de conexões diretas e indiretas.
* Comparar interpretações de diferentes autores e tradições.
* Disponibilizar visualizações históricas, geográficas e cronológicas.
* Incentivar estudos fundamentados e rastreáveis.

---

# Módulos

## 1. Grafo de conhecimento

Módulo principal da plataforma.

Permitirá criar mapas formados por nós e relacionamentos.

Os nós poderão representar:

* Pessoas;
* conceitos;
* doutrinas;
* obras;
* documentos;
* textos bíblicos;
* acontecimentos;
* movimentos;
* tradições;
* concílios;
* locais históricos;
* áreas do conhecimento.

Os relacionamentos poderão conter:

* Tipo da relação;
* direção da relação;
* explicação;
* contexto histórico;
* perspectiva interpretativa;
* fontes;
* observações do autor.

Exemplo:

```text
[Agostinho]
    └── ESCREVEU ──> [Confissões]
```

O usuário poderá expandir os nós, explorar conexões e visualizar diferentes caminhos entre os elementos.

---

## 2. Biografias

Módulo destinado ao registro e à consulta de pessoas relacionadas à história do cristianismo.

Cada biografia poderá apresentar:

* Nome;
* período histórico;
* local de nascimento;
* resumo biográfico;
* tradição ou movimento relacionado;
* obras produzidas;
* acontecimentos dos quais participou;
* pessoas relacionadas;
* doutrinas defendidas ou criticadas;
* fontes históricas;
* linha do tempo pessoal.

As informações da biografia poderão ser conectadas automaticamente aos elementos existentes no grafo.

---

## 3. Debates do Cristianismo

Módulo para organizar debates teológicos, históricos, filosóficos e sociais relacionados ao cristianismo.

Cada debate poderá conter:

* Pergunta central;
* contexto histórico;
* diferentes posições;
* argumentos;
* contra-argumentos;
* autores relacionados;
* tradições relacionadas;
* textos bíblicos utilizados;
* obras e documentos;
* fontes de fundamentação.

O módulo não terá como objetivo determinar automaticamente uma posição como verdadeira ou falsa, mas apresentar as diferentes perspectivas e suas respectivas fundamentações.

---

## 4. Fontes Históricas

Módulo responsável pela organização das evidências e referências utilizadas na construção do conhecimento.

Poderá conter:

* Obras literárias;
* documentos históricos;
* manuscritos;
* cartas;
* registros arqueológicos;
* inscrições;
* artefatos;
* artigos acadêmicos;
* livros;
* imagens;
* mapas;
* documentos de instituições;
* textos bíblicos;
* interpretações do autor.

As fontes poderão fundamentar:

* Nós;
* relacionamentos;
* biografias;
* debates;
* acontecimentos;
* doutrinas;
* interpretações.

Também poderão ser classificadas como:

* Fonte primária;
* fonte secundária;
* evidência arqueológica;
* interpretação acadêmica;
* tradição documental;
* hipótese do autor;
* fonte contestada.

---

## 5. Linha do Tempo Histórica

Módulo para visualizar pessoas, obras, movimentos e acontecimentos em ordem cronológica.

Poderá apresentar:

* Nascimentos e falecimentos;
* publicação de obras;
* realização de concílios;
* surgimento de movimentos;
* divisões históricas;
* acontecimentos políticos relacionados;
* descobertas arqueológicas;
* desenvolvimento de doutrinas.

O sistema deverá aceitar datas aproximadas, intervalos históricos e acontecimentos sem data exata.

Exemplos:

```text
Século I
Entre 48 e 49 d.C.
Por volta de 325 d.C.
Data desconhecida
```

---

## 6. Tradições, Movimentos e Correntes

Módulo destinado ao estudo das diferentes tradições e movimentos relacionados ao cristianismo.

Exemplos:

* Cristianismo primitivo;
* patrística;
* catolicismo;
* ortodoxia;
* luteranismo;
* calvinismo;
* anabatismo;
* anglicanismo;
* pentecostalismo;
* movimentos contemporâneos.

Cada tradição ou movimento poderá ser relacionado a:

* Pessoas;
* acontecimentos;
* obras;
* documentos;
* doutrinas;
* regiões;
* debates;
* movimentos anteriores;
* movimentos influenciados.

---

## 7. Doutrinas e Conceitos

Módulo para catalogar e relacionar conceitos teológicos, filosóficos e históricos.

Exemplos:

* Trindade;
* cristologia;
* graça;
* justificação;
* livre-arbítrio;
* predestinação;
* escatologia;
* soteriologia;
* eclesiologia;
* apologética.

Cada conceito poderá apresentar:

* Definição;
* contexto histórico;
* origem;
* conceitos relacionados;
* autores relacionados;
* tradições que o interpretam;
* debates;
* obras;
* textos bíblicos;
* fontes.

---

## 8. Comparador de Interpretações

Módulo que permitirá comparar diferentes interpretações sobre um mesmo conceito cristão.

Exemplo:

```text
Conceito: Batismo

Perspectiva A
Perspectiva B
Perspectiva C
```

Cada interpretação poderá conter:

* Autor ou tradição;
* definição;
* argumentos;
* textos bíblicos utilizados;
* obras utilizadas;
* período histórico;
* críticas recebidas;
* pontos semelhantes;
* pontos divergentes.

O objetivo será apresentar as diferenças de maneira organizada, contextualizada e fundamentada.

---

## 9. Cruzadas Bíblicas

Módulo destinado à conexão entre textos bíblicos, toda a relação é apenas da bíblia.

Uma passagem poderá ser relacionada a:

* Pessoas;
* locais;
* acontecimentos;
* doutrinas;
* conceitos;
* debates;
* tradições;
* interpretações;
* obras;

Exemplo:

```text
[Atos 22:3]
    ├── MENCIONA ──> [Paulo]
    ├── MENCIONA ──> [Gamaliel]
    └── FUNDAMENTA ──> [Gamaliel instruiu Paulo]
```

O módulo também permitirá identificar o motivo da relação.

---

## 10. Geografia Histórica

Módulo para representar os locais relacionados à história do cristianismo.

Poderá apresentar:

* Cidades;
* regiões;
* impérios;
* rotas de viagem;
* locais de concílios;
* locais arqueológicos;
* igrejas históricas;
* locais de nascimento;
* locais de produção de obras;
* regiões de expansão de movimentos.

Exemplo:

```text
[Paulo]
    ├── NASCEU_EM ──> [Tarso]
    ├── VISITOU ──> [Corinto]
    └── VIAJOU_PARA ──> [Roma]
```

O módulo poderá combinar informações geográficas com a linha do tempo histórica.

---

## 11. Concílios e Acontecimentos Históricos

Módulo destinado à organização de concílios, encontros, reformas, divisões e outros acontecimentos relevantes.

Exemplos:

* Concílio de Jerusalém;
* Concílio de Niceia;
* Concílio de Constantinopla;
* Grande Cisma;
* Reforma Protestante;
* Contrarreforma;
* Concílio Vaticano II.

Cada acontecimento poderá conter:

* Nome;
* período;
* localização;
* contexto;
* participantes;
* decisões;
* documentos produzidos;
* debates envolvidos;
* consequências;
* movimentos relacionados;
* fontes históricas.

Exemplo:

```text
[Concílio de Niceia]
    ├── DEBATEU ──> [Natureza de Cristo]
    ├── PRODUZIU ──> [Credo Niceno]
    └── TEVE COMO PARTICIPANTE ──> [Atanásio]
```

---

## Integração entre os módulos

Alguns módulos não funcionarão como áreas completamente isoladas, os seguintes poderão ser relacionados no grafo:

1)Biografias
2)Debates
3)Fontes Históricas
4)Tradições, Movimentos e Correntes
5)Doutrinas e Conceitos
6)Geografia Histórica
7)Concílios e acontecimentos históricos

Todos utilizarão os elementos existentes no grafo de conhecimento.

Exemplo:

```text
[Agostinho]
    ├── POSSUI_BIOGRAFIA
    ├── ESCREVEU ──> [Confissões]
    ├── PARTICIPOU_DE ──> [Debate sobre a graça]
    ├── INFLUENCIOU ──> [Tradições cristãs]
    └── RELACIONA-SE_COM ──> [Doutrina do pecado original]
```

Dessa forma, uma informação cadastrada poderá ser utilizada em diferentes visualizações e contextos sem a necessidade de duplicação.

---

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

## Status do projeto

O projeto encontra-se em fase de planejamento e definição dos requisitos.
