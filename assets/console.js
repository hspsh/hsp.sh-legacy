$('#terminal').terminal(function(command) {
    this.echo('foo');
},
{	greetings: 'wpisz <b>about</b> aby dowiedzieć się wiecej',
	name: 'console_toy',
	prompt: '$ '}
);