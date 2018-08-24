pipeline {
    agent any
    parameters {
        booleanParam(name: 'NPM_INSTALL', defaultValue: false, description: 'perform intitial npm install (on package.json update) ?')
        //string(name: 'OPT_AMIID', defaultValue: '', description: "mode DEV: lance ansible sur cette ami sans la reconstruire") 
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '15'))
    }
	
    properties([pipelineTriggers([githubPush()])])
	
    stages {

        stage('Install') {
//checkout
            when {
                expression { params.NPM_INSTALL ==~ /(?i)(Y|YES|T|TRUE|ON|RUN)/ }
            }		
            steps {
//			    withCredentials([usernamePassword(credentialsId: 'git-pass-credentials-ID', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
//                    sh("git checkout master")
//                    sh("git tag -a some_tag -m 'Jenkins'")					
//                    sh('git push https://${GIT_USERNAME}:${GIT_PASSWORD}@<REPO> --tags')
//                }
//                sh 'npm install -g @angular/cli'
                sh 'npm install'
//				sh 'npm ci'
            }
        }

		stage('CI Continuous Integration install') {
		    when {
			    NOT {
                    expression { params.NPM_INSTALL ==~ /(?i)(Y|YES|T|TRUE|ON|RUN)/ }
				}
            }
            steps {
				sh 'npm ci'
            }
        }
		
        stage('Build') {
            steps {
//                sh 'ng build --prod --env=prod --build-optimizer --source-map'
                sh 'ng build --prod --base-href /zonefactor/ --env=prod'
            }
        }

        stage('Deploy') {

            when {
                branch 'master'
            }

            steps {
                sh 'rm -rf /tmp/jenkins/builds/zonefactor'
				sh 'cp -r ./dist/* /tmp/host/jenkins/builds/zonefactor/'
// https://medium.com/@swarnakishore/deploying-angular-cli-project-to-github-pages-db49246598a1
// npm i -g angular-cli-ghpages
   sh 'angular-cli-ghpages --repo=https://github.com/benoitrolland/ZoneFactor.git --silent=false'
// publication sur les pages github			
// https://www.npmjs.com/package/angular-cli-ghpages 	
//				sh 'npx ngh'
				sh 'terraform -v'
            }
			
        }
    }
}

