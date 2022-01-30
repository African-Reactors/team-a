import sgMail from '@sendgrid/mail'


// go thro their docs 
class SendGridHelper { 
    
    static async sendConfirmationMail (token, emailAddress) {
        const server = process.env.SERVER || 'https://localhost:8000/';
    
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);

          const msg  = {
    
            to: emailAddress,
            from : `${process.env.EMAIL}`,
            templateId: `${process.env.WELCOME_MAIL_ID}`,
      
            dynamic_template_data: {
              link:`${process.env.FRONTEND_URL}verification/${token}`
            }

          }
            sgMail
            .send(msg)
            .then(() => {}, error => {
              console.error(error);
           
              if (error.response) {
                console.error(error.response.body)
              }
            });
      }
    
}

export default SendGridHelper


