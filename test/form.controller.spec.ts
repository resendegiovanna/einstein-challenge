import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('FormsController', () => {
  let app: INestApplication;
  let formId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/form/questions (GET) - should get all general questions', async () => {
    const response = await request(app.getHttpServer())
      .get('/form/questions')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((question) => {
      expect(question).toHaveProperty('question_id');
      expect(question).toHaveProperty('title');
      expect(question).toHaveProperty('answer_type_id');
      expect(question).toHaveProperty('group_id');
      expect(question).toHaveProperty('created_at');
      expect(question).toHaveProperty('deleted_at');
    });
  });

  it('/form (POST) - should create a form', async () => {
    const response = await request(app.getHttpServer())
      .post('/form')
      .send({ user_email: 'test@example.com', group_id: 2 })
      .expect(201);

    expect(response.body).toHaveProperty('form_id');
    formId = response.body.form_id;
  });

  it('/form/answers (POST) - should save answers', async () => {
    const response = await request(app.getHttpServer())
      .post('/form/answers')
      .send([
        { form_id: formId, question_id: 2, answer_id: 5 },
        { form_id: formId, question_id: 3, answer_id: 5 },
        { form_id: formId, question_id: 4, answer_id: 5 },
        { form_id: formId, question_id: 5, answer_id: 5 },
        { form_id: formId, question_id: 6, answer_id: 5 },
        { form_id: formId, question_id: 10, answer_id: 6 },
        { form_id: formId, question_id: 11, answer_id: 6 },
        { form_id: formId, question_id: 12, answer_id: 6 },
        { form_id: formId, question_id: 13, answer_id: 6 },
        { form_id: formId, question_id: 9, answer_id: 5 },
        { form_id: formId, question_id: 15, answer_id: 6 },
        { form_id: formId, question_id: 1, answer_id: 9 }
      ])
      .expect(201);

    expect(response.body).toEqual({ message: "Answers saved successfully" });
  });

  it('/form/answers (GET) - should get all answers', async () => {
    const response = await request(app.getHttpServer())
      .get('/form/answers')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((form) => {
      expect(form).toHaveProperty('user_email');
      expect(form).toHaveProperty('questions');
    });
  });

  it('/form/answers (PUT) - should update answers', async () => {
    const response = await request(app.getHttpServer())
      .put('/form/answers')
      .send([
        { form_id: formId, question_id: 2, answer_id: 4 },
        { form_id: formId, question_id: 3, answer_id: 4 },
      ])
      .expect(200);

    expect(response.body).toEqual({ message: "Answers updated successfully" });
  });

  afterAll(async () => {
    await app.close();
  });
});
