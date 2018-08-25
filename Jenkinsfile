pipeline {
    agent any
    parameters {
        booleanParam(name: 'NPM_INSTALL', defaultValue: false, description: 'perform intitial npm install (on package.json update) ?')
        //string(name: 'OPT_AMIID', defaultValue: '', description: "mode DEV: lance ansible sur cette ami sans la reconstruire") 
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '15'))
    }
	
//    script{
//	    properties([[$class: 'GithubProjectProperty', displayName: '', projectUrlStr: 'https://github.com/foo/bar/'], pipelineTriggers([githubPush()])])
//    }
	//    properties([pipelineTriggers([githubPush()])])  //The ‘properties’ section has been renamed as of version 0.8. Use ‘options’ instead
//	properties([[$class: 'GithubProjectProperty', displayName: '', projectUrlStr: 'https://github.com/foo/bar/'], pipelineTriggers([githubPush()])])
	
    stages {
//https://stackoverflow.com/questions/30576881/jenkins-build-when-a-change-is-pushed-to-github-option-is-not-working	
stage('githubPush'){steps{script{
	    properties([[$class: 'GithubProjectProperty', displayName: '', projectUrlStr: 'https://github.com/benoitrolland/ZoneFactor/'], pipelineTriggers([githubPush()])])
}}}
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
                sh 'rm -rf node_modules && rm -rf package-lock.json && npm install'
//				sh 'npm ci'
            }
		}
        stage('IC') {
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
//   sh 'angular-cli-ghpages --repo=https://GH_TOKEN@github.com/benoitrolland/benoitrolland.github.io --no-silent'
// publication sur les pages github			  https://github.com/username/username.github.io
// https://www.npmjs.com/package/angular-cli-ghpages 	
//				sh 'npx ngh'

//				sh 'cd dist'
//				node {
//				    sh 'git remote add origin ssh://git@github.com/benoitrolland/benoitrolland.github.io.git'
//                    sh 'git checkout master'
//                    sh 'git add --all'
//				    sh 'git commit -m"build $env.BUILD_ID"'
//                    sh 'echo "terraform -v :"'
//				}
                sh 'terraform -v'
				sh 'exho "pwd: "'
				sh 'pwd'
            }
			
 		}
		
		stage ("Publish to Github pages") {
			steps {
				script {
					STAGE_NAME = "Publish to Github pages"
				}
				
				// Prepare the workspace
				//deleteDir()
				sh '''
					mkdir -p ./benoitrolland.github.io/zonefactor
					cd ./benoitrolland.github.io/zonefactor
					git remote add gitPages https://github.com/benoitrolland/benoitrolland.github.io.git
					git checkout -b gitPages
					git fetch gitPages master
					mkdir 
					cp -r ../dist/* .
					git add --all
					git commit -am "build version number $env.BUILD_ID"
					git push gitPages master
				'''				
			}
		}		
    }
}

