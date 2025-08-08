// Gera e-mail único
export const genEmail = (prefix = 'qa') =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,7)}@example.com`

const API = 'https://serverest.dev' // evite depender do baseUrl do front

export const createUser = ({ admin = true, email, password, nome } = {}) => {
  const _email = email || genEmail('serverest')
  const _password = password || 'Lobo@123'
  const _nome = nome || 'QA Serverest'

  return cy.request({
    method: 'POST',
    url: `${API}/usuarios`,
    body: {
      nome: _nome,
      email: _email,
      password: _password,
      administrador: admin ? 'true' : 'false'
    },
    failOnStatusCode: false
  }).then((resp) => {
    // resp.body: { message, _id } quando sucesso
    return { id: resp.body._id, email: _email, password: _password, admin }
  })
}

export const loginAndGetToken = ({ email, password }) => {
  return cy.request({
    method: 'POST',
    url: `${API}/login`,
    body: { email, password },
    failOnStatusCode: false
  }).then((resp) => {
    // resp.body.authorization costuma vir como "Bearer xxx"
    const token = resp.body.authorization || ''
    return { token }
  })

  export const registerProduct = ({ email, password }) => {
  return cy.request({
    method: 'POST',
    url: `${API}/login`,
    body: { email, password },
    failOnStatusCode: false
  }).then((resp) => {
    // resp.body.authorization costuma vir como "Bearer xxx"
    const token = resp.body.authorization || ''
    return { token }
  })
}
