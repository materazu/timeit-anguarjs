'use strict';

app
    .constant('appConfig', {
        'title': 'Time.it, podomoro style',
        'controllerSuffix': 'Controller',
        'signUpFormError': 'Les mots de passe doivent correspondre ;)',
        'loginFormError': 'Petit problème non ?',
        'apiUrl': 'https://api.mongolab.com/api/1/databases/timeit/collections/',
        'apiDefaultParams': {
            'apiKey': 'GHv6qSgu_FJum__TQ3U1-UH2ngfdXWiM'
        },
        'apiTaskCollection': 'tasks',
        'apiProjectCollection': 'projects',
        'apiUserCollection': 'users'
    })
;