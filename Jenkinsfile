pipeline {

    environment {
        GIT_REPO_URL = 'https://github.com/StageCue/stagecue-fe.git'
        GIT_CREDENTIALS = credentials("github_personal_access_token")
    }

    agent any

    stages {
        stage('Cloning Github repository branch') {

            steps {
                script {
                    
                echo 'cloning ${env.BRANCH_NAME} branch...'
                git branch: "${env.BRANCH_NAME}",
                url: "${env.GIT_REPO_URL}",
                credentialsId: "${env.GIT_CREDENTIALS}"

                echo "Cloned successfully ${env.BRANCH_NAME} repository."
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "installing dependencies..."
                sh "yarn"

                 echo "Installed successfully dependencies."
            }
        }

        stage('Build') {
            steps {
                 echo "build application..."
                sh "yarn build"

                echo "Build successfully application."
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "build docker image..."
            }
        }


        stage('release branch: deploy to stage server') {
            when {
                branch "release"
            }
            steps {
                echo 'test: deploy release branch...'
            }
        }

        stage('main branch: deploly to prod server') {
            when {
                branch "main"
            }
            steps {
                echo 'test: deploy main branch...'
            }

        }   
    }

    post {
        success {
            echo "success"
            }
        failure {
            echo "fail"
        }
    }
}