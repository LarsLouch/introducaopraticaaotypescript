"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var requestToken;
var username = 'carlospessin';
var password = '1234';
var sessionId;
var listId;
var apiKey = 'd9556a6ad7841dd5a2a1f88086601086';
var listName;
var listDescription;
var idFilme;
var accountId;
var url = 'https://api.themoviedb.org/3';
// d9556a6ad7841dd5a2a1f88086601086
var loginButton = document.getElementById('login-button');
var listaButton = document.getElementById('lista-button');
var filmeButton = document.getElementById('button-filme');
var searchButton = document.getElementById('search-button');
var searchContainer = document.getElementById('search-container');
var containerMyList = document.getElementById('container-my-list');
var containerMovies = document.getElementById('container-movies');
document.getElementById('criar-lista').style.display = 'none';
document.getElementById('container-my-list').style.display = 'none';
document.getElementById('container-movies').style.display = 'none';
loginButton.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, criarRequestToken()];
            case 1:
                _a.sent();
                return [4 /*yield*/, logar()];
            case 2:
                _a.sent();
                return [4 /*yield*/, criarSessao()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
listaButton.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, criarLista(listName, listDescription)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
filmeButton.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
    var el, listId;
    return __generator(this, function (_a) {
        el = document.getElementById("list-name");
        listId = el.getAttribute("data");
        adicionarFilmeNaLista(idFilme, listId);
        return [2 /*return*/];
    });
}); });
searchButton.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
    var lista, query, listaDeFilmes, ul, _i, _a, item, li;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                lista = document.getElementById("lista");
                if (lista) {
                    lista.outerHTML = "";
                }
                query = document.getElementById('search').value;
                return [4 /*yield*/, procurarFilme(query)];
            case 1:
                listaDeFilmes = _b.sent();
                ul = document.createElement('ul');
                ul.id = "lista";
                for (_i = 0, _a = listaDeFilmes.results; _i < _a.length; _i++) {
                    item = _a[_i];
                    li = document.createElement('li');
                    li.appendChild(document.createTextNode(item.id + ' - ' + item.original_title));
                    ul.appendChild(li);
                }
                searchContainer.appendChild(ul);
                return [2 /*return*/];
        }
    });
}); });
function preencherSenha() {
    password = document.getElementById('senha').value;
    // validateLoginButton();
}
function preencherLogin() {
    username = document.getElementById('login').value;
    // validateLoginButton();
}
function preencherApi() {
    apiKey = document.getElementById('api-key').value;
    // validateLoginButton();
}
function validateLoginButton() {
    if (password && username && apiKey) {
        loginButton.disabled = false;
    }
    else {
        loginButton.disabled = true;
    }
}
function preencherNomeDaLista() {
    listName = document.getElementById('nome-da-lista').value;
    validateListaButton();
}
function preencherDescricaoDaLista() {
    listDescription = document.getElementById('descricao-da-lista').value;
    validateListaButton();
}
function validateListaButton() {
    if (listName && listDescription) {
        listaButton.disabled = false;
    }
    else {
        listaButton.disabled = true;
    }
}
function preencherIdFilme() {
    idFilme = document.getElementById('id-filme').value;
    validateAddFilme();
}
function validateAddFilme() {
    if (idFilme) {
        filmeButton.disabled = false;
    }
    else {
        filmeButton.disabled = true;
    }
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.get = function (_a) {
        var url = _a.url, method = _a.method, _b = _a.body, body = _b === void 0 ? null : _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var request = new XMLHttpRequest();
                        request.open(method, url, true);
                        request.onload = function () {
                            if (request.status >= 200 && request.status < 300) {
                                resolve(JSON.parse(request.responseText));
                            }
                            else {
                                reject({
                                    status: request.status,
                                    statusText: request.statusText
                                });
                            }
                        };
                        request.onerror = function () {
                            reject({
                                status: request.status,
                                statusText: request.statusText
                            });
                        };
                        if (body) {
                            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                            body = JSON.stringify(body);
                        }
                        request.send(body);
                    })];
            });
        });
    };
    return HttpClient;
}());
function procurarFilme(query) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = encodeURI(query);
                    return [4 /*yield*/, HttpClient.get({
                            url: "".concat(url, "/search/movie?api_key=").concat(apiKey, "&query=").concat(query),
                            method: "GET"
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function getAccount() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "".concat(url, "/account?api_key=").concat(apiKey, "&session_id=").concat(sessionId),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    accountId = result.id;
                    return [2 /*return*/];
            }
        });
    });
}
function criarRequestToken() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "".concat(url, "/authentication/token/new?api_key=").concat(apiKey),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    requestToken = result.request_token;
                    return [2 /*return*/];
            }
        });
    });
}
function logar() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "".concat(url, "/authentication/token/validate_with_login?api_key=").concat(apiKey),
                        method: "POST",
                        body: {
                            username: "".concat(username),
                            password: "".concat(password),
                            request_token: "".concat(requestToken)
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function criarSessao() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "".concat(url, "/authentication/session/new?api_key=").concat(apiKey, "&request_token=").concat(requestToken),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    sessionId = result.session_id;
                    localStorage.setItem('sessionId', sessionId);
                    if (result.success) {
                        showOptions();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function showOptions() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            document.getElementById("status").innerHTML = '• conectado';
            document.getElementById('criar-lista').style.display = 'flex';
            document.getElementById('container-my-list').style.display = 'block';
            getAccount();
            getMyLists();
            return [2 /*return*/];
        });
    });
}
function refresh() {
    $("#table").load("desafio4.html #table");
    getMyLists();
}
function refreshMovies(listaId) {
    $("#list-movies").load("desafio4.html #list-movies");
    pegarLista(listaId);
}
function getMyLists() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            obterListasCriadas(accountId).then(function (res) {
                if (res.results.length == 0) {
                    var p = document.createElement('p');
                    p.appendChild(document.createTextNode('nenhuma lista criada'));
                    p.setAttribute('id', 'noList');
                    containerMyList.appendChild(p);
                }
                else {
                    var noList = document.getElementById('noList');
                    if (res.results.length > 0 && noList != null) {
                        noList.style.display = "none";
                    }
                }
                var table = document.getElementById('table');
                table.style.width = '300px';
                table.setAttribute('id', 'table');
                var tableBody = document.createElement('tbody');
                table.appendChild(tableBody);
                var _loop_1 = function (item) {
                    tr = document.createElement('tr');
                    tableBody.appendChild(tr);
                    for (var j = 0; j < 1; j++) {
                        td = document.createElement('td');
                        td.style.borderBottom = "1px solid lightgray";
                        td.appendChild(document.createTextNode(item.name));
                        tr.appendChild(td);
                    }
                    for (var j = 0; j < 1; j++) {
                        td = document.createElement('td');
                        td.style.width = "35px";
                        button = document.createElement('button');
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
                        td = document.createElement('td');
                        td.style.textAlign = "end";
                        td.style.width = "70px";
                        button = document.createElement('button');
                        button.innerHTML = 'remover';
                        button.onclick = function () {
                            removerLista(item.id);
                            return false;
                        };
                        td.style.borderBottom = "1px solid lightgray";
                        td.appendChild(button);
                        tr.appendChild(td);
                    }
                };
                var tr, td, td, button, td, button;
                for (var _i = 0, _a = res.results; _i < _a.length; _i++) {
                    var item = _a[_i];
                    _loop_1(item);
                }
                containerMyList.appendChild(table);
            });
            return [2 /*return*/];
        });
    });
}
function criarLista(nomeDaLista, descricao) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "".concat(url, "/list?api_key=").concat(apiKey, "&session_id=").concat(sessionId),
                        method: "POST",
                        body: {
                            name: nomeDaLista,
                            description: descricao,
                            language: "pt-br"
                        }
                    })];
                case 1:
                    result = _a.sent();
                    refresh();
                    return [2 /*return*/, result];
            }
        });
    });
}
function adicionarFilmeNaLista(filmeId, listaId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "".concat(url, "/list/").concat(listaId, "/add_item?api_key=").concat(apiKey, "&session_id=").concat(sessionId),
                        method: "POST",
                        body: {
                            media_id: filmeId
                        }
                    })];
                case 1:
                    result = _a.sent();
                    if (result.success) {
                        refreshMovies(listaId);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function removerFilmeNaLista(filmeId, listaId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "".concat(url, "/list/").concat(listaId, "/remove_item?api_key=").concat(apiKey, "&session_id=").concat(sessionId),
                        method: "POST",
                        body: {
                            media_id: filmeId
                        }
                    })];
                case 1:
                    result = _a.sent();
                    if (result.success) {
                        refreshMovies(listaId);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function pegarLista(listId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "".concat(url, "/list/").concat(listId, "?api_key=").concat(apiKey),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    if (result) {
                        criarlistaDeFilmes(result);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function criarlistaDeFilmes(lista) {
    return __awaiter(this, void 0, void 0, function () {
        var listName, listDescription, noMovie, p, table, tableBody, _loop_2, tr, td, td, button, _i, _a, item;
        return __generator(this, function (_b) {
            document.getElementById('container-movies').style.display = 'flex';
            listName = document.getElementById('list-name');
            listDescription = document.getElementById('list-description');
            listName.setAttribute('data', lista.id);
            listName.innerHTML = lista.name;
            listDescription.innerHTML = lista.description;
            noMovie = document.getElementById('noMovie');
            console.log(lista.items.length);
            console.log(noMovie == null);
            if (lista.items.length == 0 && noMovie == null) {
                console.log('entrou no primeiro');
                p = document.createElement('p');
                p.appendChild(document.createTextNode('Nenhum filme encontrado'));
                p.setAttribute('id', 'noMovie');
                containerMovies.appendChild(p);
            }
            else if (lista.items.length > 0 && noMovie != null) {
                console.log('entrou no segundo');
                $("#noMovie").remove();
            }
            table = document.getElementById('list-movies');
            table.style.width = '300px';
            tableBody = document.createElement('tbody');
            table.appendChild(tableBody);
            _loop_2 = function (item) {
                tr = document.createElement('tr');
                tableBody.appendChild(tr);
                for (var j = 0; j < 1; j++) {
                    td = document.createElement('td');
                    td.style.borderBottom = "1px solid lightgray";
                    td.appendChild(document.createTextNode(item.title));
                    tr.appendChild(td);
                }
                for (var j = 0; j < 1; j++) {
                    td = document.createElement('td');
                    td.style.textAlign = "end";
                    td.style.width = "70px";
                    button = document.createElement('button');
                    button.innerHTML = 'remover';
                    button.onclick = function () {
                        removerFilmeNaLista(item.id, lista.id);
                        return false;
                    };
                    td.style.borderBottom = "1px solid lightgray";
                    td.appendChild(button);
                    tr.appendChild(td);
                }
            };
            for (_i = 0, _a = lista.items; _i < _a.length; _i++) {
                item = _a[_i];
                _loop_2(item);
            }
            containerMovies.appendChild(table);
            return [2 /*return*/];
        });
    });
}
function removerLista(listId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "".concat(url, "/list/").concat(listId, "?api_key=").concat(apiKey, "&session_id=").concat(sessionId),
                        method: "DELETE"
                    }).catch(function () {
                        refresh();
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function obterListasCriadas(accountId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "".concat(url, "/account/").concat(accountId, "/lists?api_key=").concat(apiKey, "&session_id=").concat(sessionId, "&page=1"),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
