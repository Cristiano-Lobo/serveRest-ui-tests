// cypress/support/api-helpers.js
const API_BASE = Cypress.env('API_BASE') || 'https://serverest.dev';

export function api(method, path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const token = Cypress.env('DEFAULT_TOKEN');

  return cy.request({
    method,
    url,
    ...options, // body, qs, headers...
    headers: { ...(token ? { Authorization: token } : {}), ...(options.headers || {}) },
  });
}

export function createUser({ admin = true, nome = 'User QA' } = {}) {
  const t = Date.now();
  const payload = {
    nome,
    email: `user_${t}@test.com`,
    password: '123456',
    administrador: String(admin),
  };

  return api('POST', '/usuarios', { body: payload }).then((res) => {
    expect(res.status).to.eq(201);
    return { email: payload.email, password: payload.password, id: res.body._id };
  });
}

export function loginAndGetToken({ email, password }) {
  return api('POST', '/login', { body: { email, password } }).then((res) => {
    expect(res.status).to.eq(200);
    return { token: res.body.authorization };
  });
}
