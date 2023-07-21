enum Profissao {
  "Atriz",
  "Padeiro"
}

type iPessoa = {
  nome: string,
  idade: number,
  profissao: Profissao
}

let pessoa1: iPessoa = {
  nome: "maria",
  idade: 29,
  profissao: Profissao.Atriz
}

let pessoa2: iPessoa = {
  nome: "roberto",
  idade: 19,
  profissao: Profissao.Padeiro
}

let pessoa3: iPessoa = {
  nome: "laura",
  idade: 32,
  profissao: Profissao.Atriz
}

let pessoa4: iPessoa = {
  nome: "carlos",
  idade: 19,
  profissao: Profissao.Padeiro
}

