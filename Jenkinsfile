pipeline {
    agent {
        label 'node'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '15'))
    }

    stages {

        stage('Install') {
//checkout
		bfc60fb8-18b5-43f6-8b06-a2559233595f
            steps {
			    withCredentials([usernamePassword(credentialsId: 'git-pass-credentials-ID', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                    sh("git checkout master")
//                    sh("git tag -a some_tag -m 'Jenkins'")					
//                    sh('git push https://${GIT_USERNAME}:${GIT_PASSWORD}@<REPO> --tags')
                }
                sh 'sudo npm install -g @angular/cli'
//                sh 'npm install'
				sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'ng build'
            }
        }

        stage('Deploy') {

            when {
                branch 'master'
            }

            steps {
                sh 'echo "Copy the dist folder somewhere"'
            }
        }
    }
}

