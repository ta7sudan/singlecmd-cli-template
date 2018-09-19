'use strict';

module.exports = function(projectName) {
	return {
		prompts: [
			{
				name: 'project',
				type: 'input',
				message: 'Project Name',
				default: projectName
			},
			{
				name: 'author',
				type: 'input',
				message: 'Author',
				validate(input) {
					return !!input;
				}
			},
			{
				name: 'desc',
				type: 'input',
				message: 'Project description',
				default: 'A multicmd cli project'
			},
			{
				name: 'keywords',
				type: 'input',
				message: 'Keywords',
				default: 'cli'
			},
			{
				name: 'cmd',
				type: 'input',
				message: 'Command name',
				default: projectName
			},
			{
				name: 'needNpmrc',
				type: 'confirm',
				message: 'need .npmrc?',
				default: false
			}
		],
		complete(answers) {
			const {needNpmrc} = answers,
				excludes = ['.dulu.js'],
				templates = ['_package.json', 'man/doc.1'],
				transform = {
					'_package.json': 'package.json'
				};
			answers.keywords = answers.keywords ? answers.keywords.split(/\s+/) : [];
			
			if (!needNpmrc) {
				excludes.push('.npmrc');
			}

			return {
				excludes,
				templates,
				transform
			};
		}
	};
};
