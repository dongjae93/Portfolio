const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const port = process.env.PORT || 3000;

app.use(
  bodyParser.json({
    strict: false
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../dist')))

app.post('/email', async (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user: 'djparkdev@gmail.com',
            pass: process.env.SECRET
        }
    });

  const mailOptions1 = {
    from: 'djparkdev@gmail.com', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: `Thanks for your consideration ${req.body.name}!`, // Subject line
    text: `Dear ${req.body.name}, \n\n\t Thanks for considering me as your company's candidate. I am really excited for the opportunity and I look forward to our conversation! \n\nBest,\nDJ Park\n\nLinkedin: https://www.linkedin.com/in/djparkdev\nGithub: https://github.com/dongjae93\nPhone: +1 (737) 704 4222\nPortfolio: https://djpark.dev`
  };

  const mailOptions2 = {
    from: `djparkdev@gmail.com`, // sender address
    to: 'dongjae93@gmail.com', // list of receivers
    subject: `${req.body.subject}`, // Subject line
    text: `Hey DJ! \n\n\t ${req.body.name} sent you an invitation from your website!\n\nmessage:\n\n\t${req.body.comments}\n\nRecruiter Name: ${req.body.name}\nRecruiter email: ${req.body.email}`
  };

  await transporter.sendMail(mailOptions1, function(err, info) {
    if(err) {
      console.log('error in sending recruiter thanks email', err)
    } else {
      console.log('Sent thank you email', info)
    }
  })

  transporter.sendMail(mailOptions2, function (err, info) {
    if(err) {
      console.log(err)
      res.redirect('/')
    } else {
      console.log(info);
      res.redirect('/');
    }
  });
})

app.post('/hire', async (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user: 'djparkdev@gmail.com',
            pass: 'djparkdev123!@#'
        }
    });

  const mailOptions1 = {
    from: 'djparkdev@gmail.com', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: `Thanks for your consideration ${req.body.fname}!`, // Subject line
    text: `Dear ${req.body.fname}, \n\n\t Thanks for considering me as your company's candidate. I am really excited for the opportunity and I look forward to our conversation! \n\nBest,\nDJ Park\n\nLinkedin: https://www.linkedin.com/in/djparkdev\nGithub: https://github.com/dongjae93\nPhone: +1 (737) 704 4222\nPortfolio: https://djpark.dev`
  };

  const mailOptions2 = {
    from: `djparkdev@gmail.com`, // sender address
    to: 'dongjae93@gmail.com', // list of receivers
    subject: `You've got a message from ${req.body.fname} who wants to hire you!`, // Subject line
    text: `Hey DJ! \n\n\t ${req.body.fname} sent you an invitation from your website!\n\ncompany:\n\n\t${req.body.cname}\n\nRecruiter Name: ${req.body.fname}\nRecruiter email: ${req.body.email}\nRecruiter Phone Number: ${req.body.phoneNumber}`
  };

  await transporter.sendMail(mailOptions1, function(err, info) {
    if(err) {
      console.log('error in sending recruiter thanks email', err)
    } else {
      console.log('Sent thank you email', info)
    }
  })

  transporter.sendMail(mailOptions2, function (err, info) {
    if(err) {
      console.log(err)
      res.redirect('/')
    } else {
      console.log(info);
      res.redirect('/');
    }
  });
})


app.listen(port, () => {
  console.log(`The shenanigans have started on aisle ${port}`);
});
