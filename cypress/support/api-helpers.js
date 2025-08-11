const API_BASE = Cypress.env('API_BASE');
const DEFAULT_PASSWORD = Cypress.env('API_PASSWORD');

if (!API_BASE || !DEFAULT_PASSWORD) {
  throw new Error('API_BASE e/ou API_PASSWORD não definidos (use cypress.env.json).');
}

export function api(method, path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  return cy.request({ method, url, ...options });
}

export function createUser({ admin = true, nome = 'User QA' } = {}) {
  const t = Date.now();
  const payload = {
    nome,
    email: `user_${t}@test.com`,
    password: DEFAULT_PASSWORD,
    administrador: String(admin),
  };

  return api('POST', '/usuarios', { body: payload }).then((res) => {
    expect(res.status).to.eq(201);
    return { id: res.body._id, email: payload.email, password: payload.password, admin };
  });
}

export function loginUser({ email, password }) {
  return api('POST', '/login', { body: { email, password } }).then((res) => {
    expect(res.status).to.eq(200);
    return { token: res.body.authorization };
  });
}

export function createProductWithAdmin(fixtureName = 'product') {
  return createUser({ admin: true }).then(({ email, password }) =>
    loginUser({ email, password }).then(({ token }) =>
      cy.fixture(fixtureName).then((product) => {
        const model = Date.now();
        return api('POST', '/produtos', {
          headers: { Authorization: token },
          body: {
            nome: `${product.nome} - ${model}`,
            preco: product.preco,
            descricao: product.descricao,
            quantidade: product.quantidade,
          },
        }).then((res) => {
          expect(res.status).to.eq(201);
          return { id: res.body._id, nome: `${product.nome} - ${model}`, token };
        });
      })
    )
  );
}

export function deleteProduct(productId, token) {
  return api('DELETE', `/produtos/${productId}`, {
    headers: { Authorization: token }
  }).then((res) => {
    expect(res.status).to.eq(200);
  });
}