const router = new (require('express').Router)();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const generatePassword = require('password-generator');
const transporter = require('../mailer');
const config = require('../config/database');

router.post('/register',  (req, res, next) => {

	User.find({email:req.body.email}, (err, docs) => {
		if(err){
			res.send(err);
		}
		if(docs.length){
			res.send({message:'Есть такой!'});
		}else{

			let password = req.body.password;

			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(password, salt, function(err, hash) {

					let newUser = new User({
						name:req.body.name,
						email:req.body.email,
						password:hash

					});

					newUser.save((err, docs) => {
						if(err){
							res.send(err);
							return;
						}else{
							res.send({message:'Вы успешно зарегистрировались'});
						}
					});
				});

			});

		}

	});		 

});


router.post('/login',  (req, res, next) => {

	User.findOne({email:req.body.email}, function(err, user){
		if(err) res.send(err);
		if(!user){
			res.send({message:'No authorization'});
		}else{

			bcrypt.compare(req.body.password, user.password, function(err, isMatch){
				if(err) res.send(err);


				if(isMatch){
					if(user.email === 'coronacia@mail.ru'){
						res.send({message:'Admin', name:user.name, id:user._id});
					}else{
						res.send({message:'Authorization', name:user.name, id:user._id});
					}



				}else{
					res.send({message:'No authorization'});
				}
			});

		}

	});

});


let mailOptions = {
	from: `"narciss.and.k" <${config.mail}>`, 
	to: '', 
	subject: 'Восстановление пароля', 
	text: 'Ваш новый пароль: '
};


router.post('/password-recovery',  (req, res, next) => {

	User.findOne({email:req.body.email}, function(err, user){
		if(err) res.send(err);
		if(!user){
			res.send({message:'No user'});
		}else{

			let newPassword = generatePassword(12, false);

			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(newPassword, salt, function(err, hash) {

					let query = {email:req.body.email};

					User.update(query, {password:hash}, (err, docs) => {
						if(err){
							res.send(err);
						}else{
                        
                        mailOptions.to = req.body.email;
						mailOptions.text += newPassword;

						transporter.sendMail(mailOptions, (error, info) => {
							if (error) {
								return console.log(error);
							}
							
							res.send({message:'check your email'});
						});


						}

						

					});

				});

			});


		}
	});

});


module.exports = router;