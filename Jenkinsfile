pipeline {

    environment {
        GIT_REPO_URL = 'https://github.com/StageCue/stagecue-fe.git'
        GIT_CREDENTIALS = credentials("github-jenkins")

         
    }

    agent any

    tools {
        nodejs 'nodejs-22.5.1'
    }


    stages {
        stage("Checking Node.js Version") {
            steps {
                echo "Checking node.js..."
                sh "node --version"
            }
        }

        stage('Cloning Github repository branch') {

            steps {
                script {

                echo 'cloning git repository...'
                git branch: "${env.BRANCH_NAME}",
                url: "${env.GIT_REPO_URL}",
                credentialsId: "${env.GIT_CREDENTIALS}"

                echo "Cloned successfully ${env.BRANCH_NAME} repository."
                }
            }
        }

      

         stage('Installing dependencies') {
            steps {
                script {
                    echo "installing dependencies..."
                    sh "pwd"
                    sh "ls"
                    yarn "install"
                    echo "Installed successfully dependencies"
                }
            }
        }

        stage('Building application') {
            steps {
                script {
                    echo "building applicaiton..."
                    dir('stagecue-fe') 
                    echo "build application..."
                    yarn "build"

                    echo "Built successfully application."
                }
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