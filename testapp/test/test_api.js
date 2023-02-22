const request = require('supertest');
const express = require('express');
const api = require('./api');

describe('Get Users', () => {
    it('should return a list of all users', async() => {
        const res = await request(api).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0].name).toEqual('John');
        expect(res.body[1].name).toEqual('James');
    });
});

describe('Get Users by id', () => {
    it('should return a single user by id', async() => {
        const res = await request(api).get('/users/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body[0].name).toEqual('John');
     });

     it('should return 404 if the user is not found', async() => {
        const res = await request(api).get('/users/999');
        expect(res.statusCode).toEqual(404);
        expect(res.body[0].name).toEqual('User not found');
     });
});

describe('Create Users', () => {
    it('should create a new user', async() => {
        const res = await request(api)
            .post('/users)
            .send({ name: 'Thiago', email: 'thigo@test.com' });
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual('Thiago');
     });
});

describe('Create a message', () => {
    it('should create a new message', async() => {
        const res = await request(api)
            .post('/messsages)
            .send({ sender: 'John', recipient: ['James', 'Thiago'], content: 'Vamstar rocks' });
        expect(res.statusCode).toEqual(201);
        expect(res.body.sender).toEqual('John');
        expect(res.body.recipient).toEqual(['James', 'Thiago']);
        expect(res.body.content).toEqual('Vamstar rocks');
     });

     it('should return 400 when the recipient is not found', async() => {
        const recipients = ['Lucas', 'Francisco'];
        const res = await request(api)
            .post('/messsages)
            .send({ sender: 'John', recipient: recipients, content: 'Vamstar rocks' });
        expect(res.statusCode).toEqual(400);
        expect(res.body[0].name).toEqual(`Invalid recipients: ${recipients}`);
     });
});