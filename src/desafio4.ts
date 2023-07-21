let requestToken: string;
let username = 'carlospessin';
let password = '1234';
let sessionId: any;
let listId: number;
let apiKey = 'd9556a6ad7841dd5a2a1f88086601086';
let listName: string;
let listDescription: string;
let idFilme: string;
let accountId: number;
let url = 'https://api.themoviedb.org/3';

// d9556a6ad7841dd5a2a1f88086601086

let loginButton = document.getElementById('login-button') as HTMLInputElement;
let listaButton = document.getElementById('lista-button') as HTMLInputElement;
let filmeButton = document.getElementById('button-filme') as HTMLInputElement;
let searchButton = document.getElementById('search-button') as HTMLInputElement;
let searchContainer = document.getElementById('search-container')!;
let containerMyList = document.getElementById('container-my-list')!;
let containerMovies = document.getElementById('container-movies')!;

document.getElementById('criar-lista')!.style.display = 'none';
document.getElementById('container-my-list')!.style.display = 'none';
document.getElementById('container-movies')!.style.display = 'none';

loginButton.addEventListener('click', async () => {
  await criarRequestToken();
  await logar();
  await criarSessao()
})

listaButton.addEventListener('click', async () => {
  await criarLista(listName, listDescription);
})

filmeButton.addEventListener('click', async () => {
  var el = document.getElementById("list-name")!;
  var listId = el.getAttribute("data");
  adicionarFilmeNaLista(idFilme, listId);
})

searchButton.addEventListener('click', async () => {
  let lista = document.getElementById("lista");
  if (lista) {
    lista.outerHTML = "";
  }
  let query = (document.getElementById('search') as HTMLInputElement).value;
  let listaDeFilmes = await procurarFilme(query) as any;
  let ul = document.createElement('ul');
  ul.id = "lista"
  for (const item of listaDeFilmes.results) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item.id + ' - ' + item.original_title))
    ul.appendChild(li)
  }
  searchContainer.appendChild(ul);
})

function preencherSenha() {
  password = (document.getElementById('senha') as HTMLInputElement).value;
  // validateLoginButton();
}

function preencherLogin() {
  username = (document.getElementById('login') as HTMLInputElement).value;
  // validateLoginButton();
}

function preencherApi() {
  apiKey = (document.getElementById('api-key') as HTMLInputElement).value;
  // validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

function preencherNomeDaLista() {
  listName = (document.getElementById('nome-da-lista') as HTMLInputElement).value;
  validateListaButton();
}

function preencherDescricaoDaLista() {
  listDescription = (document.getElementById('descricao-da-lista') as HTMLInputElement).value;
  validateListaButton();
}

function validateListaButton() {
  if (listName && listDescription) {
    listaButton.disabled = false;
  } else {
    listaButton.disabled = true;
  }
}

function preencherIdFilme() {
  idFilme = (document.getElementById('id-filme') as HTMLInputElement).value;
  validateAddFilme();
}

function validateAddFilme() {
  if (idFilme) {
    filmeButton.disabled = false;
  } else {
    filmeButton.disabled = true;
  }
}

class HttpClient {
  static async get({ url, method, body = null }: { url: string, method: any, body?: any }) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}

async function procurarFilme(query: any) {
  query = encodeURI(query)
  let result = await HttpClient.get({
    url: `${url}/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET"
  })
  return result
}

async function getAccount() {
  let result = await HttpClient.get({
    url: `${url}/account?api_key=${apiKey}&session_id=${sessionId}`,
    method: "GET"
  }) as any;
  accountId = result.id;
}

async function criarRequestToken() {
  let result = await HttpClient.get({
    url: `${url}/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  }) as any;
  requestToken = result.request_token;
}

async function logar() {
  await HttpClient.get({
    url: `${url}/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: "POST",
    body: {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  })
}

async function criarSessao() {
  let result = await HttpClient.get({
    url: `${url}/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "GET"
  }) as any
  sessionId = result.session_id;
  localStorage.setItem('sessionId', sessionId);
  if (result.success) {
    showOptions();
  }
}

async function showOptions() {
  document.getElementById("status")!.innerHTML = '• conectado';
  document.getElementById('criar-lista')!.style.display = 'flex';
  document.getElementById('container-my-list')!.style.display = 'block';

  getAccount();
  getMyLists();
}

function refresh() {
  $("#table").load("desafio4.html #table");
  getMyLists();
}

function refreshMovies(listaId: any) {
  $("#list-movies").load("desafio4.html #list-movies");
  pegarLista(listaId);
}

async function getMyLists() {

  obterListasCriadas(accountId).then((res) => {
    if (res.results.length == 0) {
      let p = document.createElement('p');
      p.appendChild(document.createTextNode('nenhuma lista criada'));
      p.setAttribute('id', 'noList')
      containerMyList.appendChild(p);
    } else {
      var noList = document.getElementById('noList');
      if (res.results.length > 0 && noList != null) {
        noList.style.display = "none"
      }
    }
    var table = document.getElementById('table')!;
    table.style.width = '300px';
    table.setAttribute('id', 'table')

    var tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

    for (const item of res.results) {
      var tr = document.createElement('tr');
      tableBody.appendChild(tr);

      for (var j = 0; j < 1; j++) {
        var td = document.createElement('td');
        td.style.borderBottom = "1px solid lightgray";
        td.appendChild(document.createTextNode(item.name));
        tr.appendChild(td);
      }

      for (var j = 0; j < 1; j++) {
        var td = document.createElement('td');
        td.style.width = "35px";
        var button = document.createElement('button');
        button.innerHTML = 'ver';
        button.onclick = function () {
          $("#list-movies").load("desafio4.html #list-movies");
          pegarLista(item.id);
          return false;
        };
        td.style.borderBottom = "1px solid lightgray";
        td.appendChild(button);
        tr.appendChild(td);
      }

      for (var j = 0; j < 1; j++) {
        var td = document.createElement('td');
        td.style.textAlign = "end";
        td.style.width = "70px";
        var button = document.createElement('button');
        button.innerHTML = 'remover';
        button.onclick = function () {
          removerLista(item.id);
          return false;
        };
        td.style.borderBottom = "1px solid lightgray";
        td.appendChild(button);
        tr.appendChild(td);
      }

    }
    containerMyList.appendChild(table);
  });
}

async function criarLista(nomeDaLista: any, descricao: any) {
  let result = await HttpClient.get({
    url: `${url}/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  }) as any;

  refresh();
  return result;
}

async function adicionarFilmeNaLista(filmeId: any, listaId: any) {
  let result = await HttpClient.get({
    url: `${url}/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  }) as any;
  if (result.success) {
    refreshMovies(listaId);
  }
}

async function removerFilmeNaLista(filmeId: any, listaId: any) {
  let result = await HttpClient.get({
    url: `${url}/list/${listaId}/remove_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  }) as any;
  if (result.success) {
    refreshMovies(listaId);
  }
}

async function pegarLista(listId: number) {
  let result = await HttpClient.get({
    url: `${url}/list/${listId}?api_key=${apiKey}`,
    method: "GET"
  });
  if (result) {
    criarlistaDeFilmes(result)
  }
}

async function criarlistaDeFilmes(lista: any) {
  document.getElementById('container-movies')!.style.display = 'flex';

  const listName = document.getElementById('list-name')!;
  const listDescription = document.getElementById('list-description')!;
  listName.setAttribute('data', lista.id)
  listName.innerHTML = lista.name;
  listDescription.innerHTML = lista.description;

  var noMovie = document.getElementById('noMovie');
  console.log(lista.items.length)
  console.log(noMovie == null)
  if (lista.items.length == 0 && noMovie == null) {
    console.log('entrou no primeiro')
    let p = document.createElement('p');
    p.appendChild(document.createTextNode('Nenhum filme encontrado'));
    p.setAttribute('id', 'noMovie')
    containerMovies.appendChild(p);
  } else if (lista.items.length > 0 && noMovie != null) {
    console.log('entrou no segundo')
    $("#noMovie").remove();

  } 

  var table = document.getElementById('list-movies')!;
  table.style.width = '300px';

  var tableBody = document.createElement('tbody');
  table.appendChild(tableBody);

  for (const item of lista.items) {
    var tr = document.createElement('tr');
    tableBody.appendChild(tr);

    for (var j = 0; j < 1; j++) {
      var td = document.createElement('td');
      td.style.borderBottom = "1px solid lightgray";
      td.appendChild(document.createTextNode(item.title));
      tr.appendChild(td);
    }

    for (var j = 0; j < 1; j++) {
      var td = document.createElement('td');
      td.style.textAlign = "end";
      td.style.width = "70px";
      var button = document.createElement('button');
      button.innerHTML = 'remover';
      button.onclick = function () {
        removerFilmeNaLista(item.id, lista.id);
        return false;
      };
      td.style.borderBottom = "1px solid lightgray";
      td.appendChild(button);
      tr.appendChild(td);
    }

  }
  containerMovies.appendChild(table);
}

async function removerLista(listId: number) {
  await HttpClient.get({
    url: `${url}/list/${listId}?api_key=${apiKey}&session_id=${sessionId}`,
    method: "DELETE"
  }).catch(() => {
    refresh();
  }
  )
}

async function obterListasCriadas(accountId: number) {
  let result = await HttpClient.get({
    url: `${url}/account/${accountId}/lists?api_key=${apiKey}&session_id=${sessionId}&page=1`,
    method: "GET"
  }) as any;
  return result;
}