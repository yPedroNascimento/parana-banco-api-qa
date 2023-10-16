

describe('Testes de API do case técnico da empresa Parana Banco', () => {
    it('GET Users - Success', () => {
        cy.getUsers()
        cy.get('@response').should((response) => {
            expect(response.status).to.equal(200);
            const jsonSchema = {
                type: 'array',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    username: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    address: {
                        type: 'object',
                        properties: {
                            street: { type: 'string' },
                            suite: { type: 'string' },
                            city: { type: 'string' },
                            zipcode: { type: 'string' },
                            geo: {
                                type: 'object',
                                properties: {
                                    lat: { type: 'string'},
                                    lng: { type: 'string'},
                                },
                                required: ['lat', 'lng'],
                            },
                        },
                        required: ['street', 'suite', 'city', 'zipcode', 'geo'],
                    },
                    phone: { type: 'string' },
                    website: { type: 'string', format: 'uri' },
                    company: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            catchPhrase: { type: 'string' },
                            bs: { type: 'string' },
                        },
                        required: ['name', 'catchPhrase', 'bs'],
                    },
                },
                required: ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'],
            };
            expect(response.body).to.be.jsonSchema(jsonSchema);
        })
    })
    it('GET User by ID - Success', () => {

        const id = 1;

        cy.getUserById(id)
        cy.get('@response').should((response) => {
            expect(response.status).to.equal(200),
            expect(response.body.name).to.equal('Leanne Graham')
            expect(response.body.username).to.equal('Bret')
            expect(response.body.email).to.equal('Sincere@april.biz')
        })
    });

    it('Create a new user - Success', () => {
        const newUser = {
            name: 'Pedro Nascimento',
            username: 'pedroNascimento',
            email: 'pedronascimento@teste.com',
        };

        cy.createUser(newUser)
            .then((response) => {
                expect(response.status).to.equal(201);
                expect(response.body.id).to.be.equal(11);
                expect(response.body.name).to.equal(newUser.name);
                expect(response.body.username).to.equal(newUser.username);
                expect(response.body.email).to.equal(newUser.email);
            });
    });

    it('Update user data - Success', () => {
        const userId = 1;
        const updatedUserData = {
            id: userId,
            name: 'Teste QA',
            username: 'testeQa',
            email: 'testeqa@paranabanco.com',
        };

        cy.updateUser(userId, updatedUserData)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal(updatedUserData.name);
                expect(response.body.username).to.equal(updatedUserData.username);
                expect(response.body.email).to.equal(updatedUserData.email);
            });
    });


    it('Delete a user by ID - Success', () => {
        const userId = 1;

        cy.deleteUserById(userId)
            .then((response) => {
                expect(response.status).to.equal(200);
            });
    });

    it('GET User by ID - Not found', () => {
        const id = 11;

        cy.getUserById(id)
        cy.get('@response').should((response) => {
            expect(response.status).to.equal(404)
        })
    });
});
