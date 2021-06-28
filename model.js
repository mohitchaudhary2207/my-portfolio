
var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
	name: String,
	heading: String,
    typed_text: String,
    heading_para: String,

	img:
	{
		data: Buffer,
		contentType: String
	}
},{ collection : 'profile' });

var profileSchemas = new mongoose.model('profile', profileSchema);

var serviceSchema = new mongoose.Schema({
	service_heading: String,
	service_para: String,
    icon: String,
},{ collection : 'service' });

var serviceSchemas = new mongoose.model('service', serviceSchema);

var progressbarSchema = new mongoose.Schema({
	skill_name: String,
	percent: String,

},{ collection : 'progressbar' });

var progressbarSchemas = new mongoose.model('progressbar', progressbarSchema);


var expSchema = new mongoose.Schema({
	exp_heading: String,
	exp_sub_heading: String,
    exp_para: String,
    duration: String,
    left: Boolean,

},{ collection : 'exp' });

var expSchemas = new mongoose.model('exp', expSchema);



var newsSchema = new mongoose.Schema({
	news_heading: String,
	news_para: String,
    news_btn: String,
    btn_link: String,

},{ collection : 'news' });

var newsSchemas = new mongoose.model('news', newsSchema);




var projectSchema = new mongoose.Schema({
	project_heading: String,
	project_para: String,
    github_link: String,
    category: String,

	img:
	{
		data: Buffer,
		contentType: String
	}
},{ collection : 'projects' });

var projectSchemas = new mongoose.model('projects', projectSchema);



var testischema = new mongoose.Schema({
	testi_heading: String,
	testi_para: String,
    work: String,
	img:
	{
		data: Buffer,
		contentType: String
	}
},{ collection : 'testimonials' });

var testiSchemas = new mongoose.model('testimonials', testischema);


var footerSchema = new mongoose.Schema({
	add: String,
	no: String,
    gmail: String,
    github: String,
	insta: String,
    fb: String,
    twit: String,
    linkedin: String

},{ collection : 'footer' });

var footerSchemas = new mongoose.model('footer', footerSchema);


module.exports = {
	profileSchema:profileSchemas,
	progressbarSchema:progressbarSchemas,
	serviceSchema:serviceSchemas,
	expSchema:expSchemas,
	newsSchema:newsSchemas,
    projectSchema:projectSchemas,
	testischema:testiSchemas,
	footerSchema:footerSchemas
	
}


