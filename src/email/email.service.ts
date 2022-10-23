import { Injectable } from '@nestjs/common';

import { TransactionalEmailsApi, SendSmtpEmail } from '@sendinblue/client';

@Injectable()
export class EmailService {
  async sendActivationEmail(email: string, token: string) {
    try {
      const apiInstance = new TransactionalEmailsApi();
      apiInstance.setApiKey(0, process.env.SENDING_BLUE_API);
      const sendSmtpEmail = new SendSmtpEmail();
      sendSmtpEmail.subject = 'Activation';
      sendSmtpEmail.htmlContent = `<html><body><h1>Activate your commu account ${token}</h1></body></html>`;
      sendSmtpEmail.sender = {
        name: 'Vincent',
        email: 'contact@commu.com',
      };
      sendSmtpEmail.to = [{ email }];
      sendSmtpEmail.params = {
        parameter: 'My param value',
        subject: 'New Subject',
      };

      apiInstance.sendTransacEmail(sendSmtpEmail).then(
        function (data) {
          console.log(
            'API called successfully. Returned data: ' + JSON.stringify(data),
          );
        },
        function (error) {
          console.error(error);
        },
      );
    } catch (error) {
      console.error(error);
    }
  }
}
