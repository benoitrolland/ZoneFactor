pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '15'))
    }

    stages {

        stage('Install') {
//checkout
		
            steps {
//			    withCredentials([usernamePassword(credentialsId: 'git-pass-credentials-ID', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
//                    sh("git checkout master")
//                    sh("git tag -a some_tag -m 'Jenkins'")					
//                    sh('git push https://${GIT_USERNAME}:${GIT_PASSWORD}@<REPO> --tags')
//                }
//                sh 'npm install -g @angular/cli'
//                sh 'npm install'
				sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'ng build --prod --build-optimizer --source-map'
            }
        }

        stage('Deploy') {

            when {
                branch 'master'
            }

            steps {
                sh 'rm -rf /tmp/jenkins/builds/zonefactor'
				sh 'cp ./dist/* /tmp/host/jenkins/builds/zonefactor/'
            }
			
        }
    }
}

