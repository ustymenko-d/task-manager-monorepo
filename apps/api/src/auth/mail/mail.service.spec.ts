import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { configServiceMock, mockLoggerError } from 'test/mocks/common';

jest.mock('nodemailer');

describe('MailService', () => {
	let service: MailService;
	let sendMailMock: jest.Mock;
	let loggerErrorSpy: jest.SpyInstance;

	beforeEach(async () => {
		jest.clearAllMocks();

		sendMailMock = jest.fn().mockResolvedValue({});
		(nodemailer.createTransport as unknown as jest.Mock).mockReturnValue({
			sendMail: sendMailMock,
		});

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MailService,
				{ provide: ConfigService, useValue: configServiceMock },
			],
		}).compile();

		service = module.get(MailService);
		loggerErrorSpy = mockLoggerError(service);
	});

	const email = 'user@email.com';

	it('конфігурує транспортер з Gmail та auth із ConfigService', () => {
		expect(nodemailer.createTransport).toHaveBeenCalledWith({
			service: 'gmail',
			auth: {
				user: configServiceMock.get!('EMAIL_USER'),
				pass: configServiceMock.get!('EMAIL_PASS'),
			},
		});
	});

	describe('sendVerificationEmail', () => {
		const token = 'verify-token';

		it('викликає sendMail з правильним посиланням і темою', async () => {
			await service.sendVerificationEmail(email, token);

			const expectedUrl = `${configServiceMock.get!('FRONTEND_URL')}/verification?verificationToken=${token}`;
			expect(sendMailMock).toHaveBeenCalledTimes(1);
			expect(sendMailMock).toHaveBeenCalledWith({
				from: configServiceMock.get!('EMAIL_USER'),
				to: email,
				subject: 'Verify your email on uTodo',
				html: expect.stringContaining(expectedUrl),
			});
		});

		it('логгує помилку Error у форматі message+stack', async () => {
			const err = new Error('SMTP down');
			sendMailMock.mockRejectedValueOnce(err);

			await service.sendVerificationEmail(email, token);

			expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
			const [msg, meta] = loggerErrorSpy.mock.calls[0];
			expect(msg).toBe('Email sending error:');
			expect(meta).toEqual(
				expect.objectContaining({
					message: 'SMTP down',
					stack: expect.any(String),
				})
			);
		});

		it('логгує unknown помилку у fallback-гілці', async () => {
			const unknownErr = { foo: 'bar' };
			sendMailMock.mockRejectedValueOnce(unknownErr);

			await service.sendVerificationEmail(email, token);

			expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
			const [msg, meta] = loggerErrorSpy.mock.calls[0];
			expect(msg).toBe('Unknown error while sending email:');
			expect(meta).toEqual(expect.objectContaining({ error: unknownErr }));
		});
	});

	describe('sendResetPasswordEmail', () => {
		const token = 'reset-token';

		it('викликає sendMail з правильним посиланням і темою', async () => {
			await service.sendResetPasswordEmail(email, token);

			const expectedUrl = `${configServiceMock.get!('FRONTEND_URL')}/auth/reset-password?resetToken=${token}`;
			expect(sendMailMock).toHaveBeenCalledTimes(1);
			expect(sendMailMock).toHaveBeenCalledWith({
				from: configServiceMock.get!('EMAIL_USER'),
				to: email,
				subject: 'Reset Your uTodo password',
				html: expect.stringContaining(expectedUrl),
			});
		});

		it('логгує помилку Error у форматі message+stack', async () => {
			const err = new Error('SMTP error');
			sendMailMock.mockRejectedValueOnce(err);

			await service.sendResetPasswordEmail(email, token);

			expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
			const [msg, meta] = loggerErrorSpy.mock.calls[0];
			expect(msg).toBe('Email sending error:');
			expect(meta).toEqual(
				expect.objectContaining({
					message: 'SMTP error',
					stack: expect.any(String),
				})
			);
		});
	});
});
